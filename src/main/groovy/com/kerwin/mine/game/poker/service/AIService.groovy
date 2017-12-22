package com.kerwin.mine.game.poker.service

import com.kerwin.mine.game.poker.domain.AIPokerModel
import com.kerwin.mine.game.poker.domain.PlayersPokers
import com.kerwin.mine.game.poker.domain.Poker
import com.kerwin.mine.game.poker.domain.PokerType
import groovy.util.logging.Slf4j

/**
 * Created by lxu on 2017/12/22.
 */
@Slf4j
class AIService {

    private static final String SIGN = ","
    private static final String SIGN2 = "-"
    private static final int POWER = 8

    //根据权重判断是否抢地主
    static String judgeLord(PlayersPokers playersPokers) {
        if (getScore(getModel(playersPokers.playerB)) > POWER) {
            return "playerB"
        } else if (getScore(getModel(playersPokers.playerC)) > POWER) {
            return "playerC"
        } else {
            return "none"
        }
    }
    //查询地主牌权值
    static int getScore(AIPokerModel model) {
        int count = 0
        count += model.a4?.size() * 10
        count += model.a112233?.size() * 8
        count += model.a111222?.size() * 6
        count += model.a123?.size() * 5
        count += model.a3?.size() * 3
        log.debug "权重为 ： " + count
        return count
    }
    //拆牌
    static AIPokerModel getModel(List<Poker> list) {
        //先复制一个list
        List list2 = new ArrayList<Poker>(list)
        AIPokerModel model = new AIPokerModel()
        //先拆炸弹
        getBoomb(list2, model)
        //拆3带
        getThree(list2, model)
        //拆飞机
        getPlane(list2, model)
        //拆对子
        getTwo(list2, model)
        //拆连队
        getTwoTwo(list2, model)
        //拆顺子
        get123(list2, model)
        //拆单
        getSingle(list2, model)
        log.debug "牌型为：----------------------" + model
        return model
    }
    //拆炸弹
    static void getBoomb(List<Poker> list, AIPokerModel model) {
        List<Poker> del = new ArrayList<Poker>()//要删除的Pokers
        int len = list.size()
        //王炸
        if (list.size() >= 2 && list[0].type == 0 && list[1].type == 0) {
            model.a4.add(getName(list[0]) + SIGN + getName(list[1])) //按名字加入
            del.add(list[0])
            del.add(list[1])
        }
        //如果王不构成炸弹则先拆单
        if (list[0].type == 0 && list[1].type != 0) {
            del.add(list[0])
            model.a1.add(getName(list[0]))
        }
        //一般的炸弹
        for (int i = 0; i < len; i++) {
            if (i + 3 < len && list[i].card_value == list[i + 3].card_value) {
                String s = getName(list[i]) + SIGN
                s += getName(list[i + 1]) + SIGN
                s += getName(list[i + 2]) + SIGN
                s += getName(list[i + 3])
                model.a4.add(s)
                for (int j = i; j <= i + 3; j++)
                    del.add(list.get(j))
                i = i + 3
            }
        }
        list.removeAll(del)
    }
    //拆3带
    static void getThree(List<Poker> list, AIPokerModel model) {
        List<Poker> del = new ArrayList<Poker>()//要删除的Pokers
        int len = list.size()
        //连续3张相同
        for (int i = 0; i < len; i++) {
            if (i + 2 < len && list[i].card_value == list[i + 2].card_value) {
                String s = getName(list[i]) + SIGN
                s += getName(list[i + 1]) + SIGN
                s += getName(list[i + 2])
                model.a3.add(s)
                for (int j = i; j <= i + 2; j++)
                    del.add(list.get(j))
                i = i + 2
            }
        }
        list.removeAll(del)
    }
    //拆飞机
    static void getPlane(List<Poker> list, AIPokerModel model) {
        List<String> del = new ArrayList<String>()//要删除的Pokers
        //从model里面的3带找
        List<String> l = model.a3
        int len = l.size()
        if (l.size() < 2)
            return
        Integer[] s = new Integer[l.size()]
        for (int i = 0; i < len; i++) {
            String[] name = l[i].split(SIGN)
            s[i] = getValueByName(name[0])
        }
        for (int i = 0; i < len; i++) {
            int k = i
            for (int j = i; j < len; j++) {
                if (s[i] - s[j] == j - i)
                    k = j
            }
            if (k != i) {//说明从i到k是飞机
                String ss = ""
                for (int j = i; j < k; j++) {
                    ss += l.get(j) + SIGN
                    del.add(l.get(j))
                }
                ss += l.get(k)
                model.a111222.add(ss)
                del.add(l.get(k))
                i = k
            }
        }
        l.removeAll(del)
    }
    //拆对子
    static void getTwo(List<Poker> list, AIPokerModel model) {
        List<Poker> del = new ArrayList<Poker>()//要删除的Pokers
        int len = list.size()
        //连续2张相同
        for (int i = 0; i < len; i++) {
            if (i + 1 < len && list[i].card_value == list[i + 1].card_value) {
                String s = getName(list[i]) + SIGN
                s += getName(list[i + 1])
                model.a2.add(s)
                for (int j = i; j <= i + 1; j++)
                    del.add(list.get(j))
                i = i + 1
            }
        }
        list.removeAll(del)
    }
    //拆连队
    static void getTwoTwo(List<Poker> list, AIPokerModel model) {
        List<String> del = new ArrayList<String>()//要删除的Pokers
        //从model里面的对子找
        List<String> l = model.a2;
        if (l.size() < 3)
            return
        Integer[] s = new Integer[l.size()]
        int len = l.size()
        for (int i = 0; i < len; i++) {
            String[] name = l[i].split(SIGN)
            s[i] = getValueByName(name[0])
        }
        //s0,1,2,3,4  13,9,8,7,6
        for (int i = 0; i < len; i++) {
            int k = i
            for (int j = i; j < len; j++) {
                if (s[i] - s[j] == j - i)
                    k = j
            }
            if (k - i >= 2)//k=4 i=1
            {//说明从i到k是连队
                String ss = ""
                for (int j = i; j < k; j++) {
                    ss += l.get(j) + SIGN
                    del.add(l.get(j))
                }
                ss += l.get(k)
                model.a112233.add(ss)
                del.add(l.get(k))
                i = k
            }
        }
        l.removeAll(del)
    }
    //拆顺子
    static void get123(List<Poker> list, AIPokerModel model) {
        List<Poker> del = new ArrayList<Poker>()//要删除的Pokers
        int len = list.size()
        if (list.size() > 0 && (list[0].card_value < 7 || list[list.size() - 1].card_value > 10))
            return
        if (list.size() < 5)
            return
        for (int i = 0; i < len; i++) {
            int k = i;
            for (int j = i; j < len; j++) {
                if (list[i].card_value - list[j].card_value == (j - i)) {
                    k = j
                }
            }
            if (k - i >= 4) {
                String s = ""
                for (int j = i; j < k; j++) {
                    s += getName(list[j]) + SIGN
                    del.add(list[j])
                }
                s += getName(list[k])
                del.add(list[k])
                model.a123.add(s)
                i = k
            }
        }
        list.removeAll(del)
    }
    //拆单牌
    static void getSingle(List<Poker> list, AIPokerModel model) {
        List<Poker> del = new ArrayList<Poker>()//要删除的Pokers
        int len = list.size()
        //1
        for (int i = 0; i < len; i++) {
            model.a1.add(getName(list[i]))
            del.add(list[i])
        }
        list.removeAll(del)
    }
    //获取类型加大小
    static String getName(Poker poker) {
        return poker.id + SIGN2 + poker.type + SIGN2 + poker.type_cname + SIGN2 + poker.card_value + SIGN2 + poker.card_cname + SIGN2 + poker.choose_flag
    }
    //按name获得Poker，方便从Model取出
    static List<Poker> getPokerByName(String str) {
        String[] name = str.split(SIGN)
        List<Poker> pokers = new ArrayList<Poker>()
        name?.each { one ->
            String[] attr = one.split(SIGN2)
            Poker poker = new Poker()
            poker.setId(Integer.valueOf(attr[0]))
            poker.setType(Integer.valueOf(attr[1]))
            poker.setType_cname(attr[2])
            poker.setCard_value(Integer.valueOf(attr[3]))
            poker.setCard_cname(attr[4])
            poker.setChoose_flag(Integer.valueOf(attr[5]))
            pokers.add(poker)
        }
        return pokers
    }
    //按name获得card_value
    static int getValueByName(String poker) {
        String[] attr = poker.split(SIGN2)
        return Integer.valueOf(attr[3])
    }
    //走牌
    static List<Poker> showCard(List<Poker> pokers, List<Poker> l_pokers, boolean push_flag) {
        AIPokerModel model = getModel(pokers)
        // 待走的牌
        List<String> list = new ArrayList()
        // 如果是主动出牌
        if (push_flag) {
            // 有飞机出飞机
            if (model.a111222.size() > 0) {
                String[] name = model.a111222.get(0).split(SIGN)
                // 带单
                if (name.length / 3 <= model.a1.size()) {
                    list.add(model.a111222.get(model.a111222.size() - 1))
                    for (int i = 0; i < name.length / 3; i++)
                        list.add(model.a1.get(i))
                } else if (name.length / 3 <= model.a2.size())// 带双
                {
                    list.add(model.a111222.get(model.a111222.size() - 1))
                    for (int i = 0; i < name.length / 3; i++)
                        list.add(model.a2.get(i))
                }

            }

            // 有双顺出双顺
            else if (model.a112233.size() > 0) {
                list.add(model.a112233.get(model.a112233.size() - 1))
            }

            // 有顺子出顺子
            else if (model.a123.size() > 0) {
                list.add(model.a123.get(model.a123.size() - 1))
            }

            // 有3带就出3带，没有就出光3
            else if (model.a3.size() > 0) {
                // 3带单,且非关键时刻不能带王，2
                if (model.a1.size() > 0) {
                    list.add(model.a1.get(model.a1.size() - 1))
                }// 3带对
                else if (model.a2.size() > 0) {
                    list.add(model.a2.get(model.a2.size() - 1))
                }
                list.add(model.a3.get(model.a3.size() - 1))
            }

            // 有对子出对子 (除开3带，飞机)
            else if (model.a2.size() > (model.a111222.size() * 2 + model.a3
                    .size())) {
                list.add(model.a2.get(model.a2.size() - 1))
            }

            // 有单出单 (除开3带，飞机能带的单牌)
            else if (model.a1.size() > (model.a111222.size() * 2 + model.a3.size())) {
                list.add(model.a1[model.a1.size() - 1])
            }

            // 有炸弹出炸弹
            else if (model.a4.size() > 0) {
                // 4带2,1
                int sizea1 = model.a1.size()
                int sizea2 = model.a2.size()
                if (sizea1 >= 2) {
                    list.add(model.a1.get(sizea1 - 1))
                    list.add(model.a1.get(sizea1 - 2))
                    list.add(model.a4.get(0))

                } else if (sizea2 >= 2) {
                    list.add(model.a2.get(sizea1 - 1))
                    list.add(model.a2.get(sizea1 - 2))
                    list.add(model.a4.get(0))

                } else {// 直接炸
                    list.add(model.a4.get(0))
                }
            }
        }// 如果是跟牌
        else {
            PokerType cType = PokerService.jugdePokerType(l_pokers)
            //如果是单牌
            if (cType == PokerType.c1) {
                AI_1(model.a1, l_pokers, list)
            }//如果是对子
            else if (cType == PokerType.c2) {
                AI_1(model.a2, l_pokers, list)
            }//3带
            else if (cType == PokerType.c3) {
                AI_1(model.a3, l_pokers, list)
            }//炸弹
            else if (cType == PokerType.c4) {
                AI_1(model.a4, l_pokers, list)
            }//如果是3带1
            else if (cType == PokerType.c31) {
                AI_2(model.a3, model.a1, l_pokers, list)
            }//如果是3带2
            else if (cType == PokerType.c32) {
                AI_2(model.a3, model.a2, l_pokers, list)
            }//如果是4带11
            else if (cType == PokerType.c411) {
                AI_5(model.a4, model.a1, l_pokers, list)
            }
            //如果是4带22
            else if (cType == PokerType.c422) {
                AI_5(model.a4, model.a2, l_pokers, list)
            }
            //顺子
            else if (cType == PokerType.c123) {
                AI_3(model.a123, l_pokers, list)
            }
            //双顺
            else if (cType == PokerType.c1122) {
                AI_3(model.a112233, l_pokers, list)
            }
            //飞机带单
            else if (cType == PokerType.c11122234) {
                AI_4(model.a111222, model.a1, l_pokers, list)
            }
            //飞机带对
            else if (cType == PokerType.c1112223344) {
                AI_4(model.a111222, model.a2, l_pokers, list)
            }
            //炸弹
            if (list.size() == 0 && cType != PokerType.king && cType != PokerType.c4) {
                int len4 = model.a4.size()
                if (len4 > 0)
                    list.add(model.a4.get(len4 - 1))
            }
        }
        //将string转为poker
        List<Poker> push_pokers = new ArrayList<>()
        list?.each {
            List<Poker> poker = getPokerByName(it)
            push_pokers.addAll(poker)
        }
        return push_pokers
    }
    //单牌，对子，3个，4个,通用
    static void AI_1(List<String> model, List<Poker> l_pokers, List<String> pokers) {
        int len = model.size()
        for (int i = len - 1; i >= 0; i--) {
            if (getValueByName(model[i]) > l_pokers[0].card_value) {
                pokers.add(model[i]);
                break;
            }
        }
    }
    //3带1,2,4带1,2
    static void AI_2(List<String> model1, List<String> model2, List<Poker> l_pokers, List<String> pokers) {
        //model1是主牌,model2是带牌,l_pokers是玩家出的牌,pokers是准备回的牌
        int len1 = model1.size()
        int len2 = model2.size()
        //按照重复次数获得牌最大值
        int l_max = PokerService.getOrderByRepeat(l_pokers)
        if (len1 < 1 || len2 < 1)
            return
        int len = len1
        for (int i = len - 1; i >= 0; i--) {
            if (getValueByName(model1[i]) > l_max) {
                pokers.add(model1[i])
                break
            }
        }
        pokers.add(model2.get(len2 - 1))
        if (pokers.size() < 2)
            pokers.clear()
    }
    //顺子
    static void AI_3(List<String> model, List<Poker> l_pokers, List<String> pokers) {
        int len = model.size()
        for (int i = 0; i < len; i++) {
            String[] s = model[i].split(SIGN);
            if (s.length == l_pokers.size() && getValueByName(model[i]) > (l_pokers[0].card_value)) {
                pokers.add(model[i])
                break
            }
        }
    }
    //飞机带单，双
    static void AI_4(List<String> model1, List<String> model2, List<Poker> l_pokers, List<String> pokers) {
        //按照重复次数获得牌最大值
        int l_max = PokerService.getOrderByRepeat(l_pokers)
        int len1 = model1.size()
        int len2 = model2.size()
        if (len1 < 1 || len2 < 1)
            return
        for (int i = 0; i < len1; i++) {
            String[] s = model1[i].split(SIGN)
            String[] s2 = model2[0].split(SIGN)
            if ((s.length / 3 <= len2) && (s.length * (3 + s2.length) == l_pokers.size()) && getValueByName(model1[i]) > l_max) {
                pokers.add(model1[i])
                for (int j = 1; j <= s.length / 3; j++)
                    pokers.add(model2[len2 - j])
            }
        }
    }
    //4带1，2
    static void AI_5(List<String> model1, List<String> model2, List<Poker> l_pokers, List<String> pokers) {
        //按照重复次数获得牌最大值
        int l_max = PokerService.getOrderByRepeat(l_pokers)
        int len1 = model1.size()
        int len2 = model2.size()
        if (len1 < 1 || len2 < 2)
            return
        for (int i = 0; i < len1; i++) {
            if (getValueByName(model1[i]) > l_max) {
                pokers.add(model1[i]);
                for (int j = 1; j <= 2; j++)
                    pokers.add(model2.get(len2 - j))
            }
        }
    }

    static main(def args) {

        Poker poker1 = new Poker(1, 1, "黑桃", 3, "3", 0)
        Poker poker2 = new Poker(2, 2, "红心", 4, "4", 0)
        Poker poker3 = new Poker(3, 3, "草花", 5, "5", 0)
        Poker poker4 = new Poker(4, 1, "黑桃", 6, "6", 0)
        Poker poker5 = new Poker(5, 2, "红心", 7, "7", 0)
        Poker poker6 = new Poker(6, 3, "草花", 8, "8", 0)
        Poker poker7 = new Poker(7, 1, "黑桃", 9, "9", 0)
        Poker poker8 = new Poker(8, 1, "黑桃", 10, "10", 0)
        Poker poker9 = new Poker(9, 2, "红心", 11, "J", 0)
        Poker poker10 = new Poker(10, 2, "红心", 12, "Q", 0)
        Poker poker11 = new Poker(11, 1, "黑桃", 13, "K", 0)
        Poker poker12 = new Poker(12, 2, "红心", 14, "A", 0)
        Poker poker13 = new Poker(13, 3, "草花", 15, "2", 0)
        Poker poker14 = new Poker(14, 0, "", 16, "小王", 0)
        Poker poker15 = new Poker(15, 0, "", 17, "大王", 0)

        List<Poker> pokers = new ArrayList<>()
        pokers.add(poker1)
        pokers.add(poker2)
        pokers.add(poker2)
        pokers.add(poker3)
        pokers.add(poker3)
        pokers.add(poker4)
        pokers.add(poker5)
        pokers.add(poker5)
        pokers.add(poker5)
        pokers.add(poker5)
        pokers.add(poker6)
        pokers.add(poker6)
        pokers.add(poker6)
        pokers.add(poker7)
        pokers.add(poker7)
        pokers.add(poker7)
        pokers.add(poker8)
        pokers.add(poker8)
        pokers.add(poker8)
        pokers.add(poker9)
        pokers.add(poker10)
        pokers.add(poker10)
        pokers.add(poker11)
        pokers.add(poker11)
        pokers.add(poker12)
        pokers.add(poker12)
        pokers.add(poker13)
        pokers.add(poker14)
        pokers.add(poker15)
        pokers = Poker.orderPoker(pokers)
        List<Poker> l_pokers = new ArrayList<>()
        l_pokers.add(poker1)
        l_pokers.add(poker1)
        l_pokers.add(poker1)
        l_pokers = Poker.orderPoker(l_pokers)

        //测试主动出牌
//        for(int i = 1 ; i <= 4 ; i++){
//            println "第" + i + "手牌"
//            List<Poker> result = showCard(pokers, null, true)
//            PokerService.removePoker(pokers, result)
//            result?.each {
//                println it.toString()
//            }
//        }

        //测试接牌
        List<Poker> result = showCard(pokers, l_pokers, false)
        result?.each {
            println it.toString()
        }
    }
}
