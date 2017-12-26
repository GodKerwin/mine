package com.kerwin.mine.game.poker.service

import com.kerwin.mine.game.poker.domain.PlayersPokers
import com.kerwin.mine.game.poker.domain.Poker
import com.kerwin.mine.game.poker.domain.PokerType

/**
 * Created by lxu on 2017/12/22.
 */
class PokerService {

    //删除已出的牌
    static List<Poker> removePoker(List<Poker> pokers, List<Poker> remove) {
        List<Integer> removeIds = new ArrayList<>()
        remove.each {
            removeIds.add(it.id)
        }
        Iterator<Poker> it = pokers.iterator()
        while (it.hasNext()) {
            Poker poker = it.next()
            if (removeIds.contains(poker.id)) {
                it.remove()
            }
        }
        return pokers
    }
    //判断牌类型
    static PokerType jugdePokerType(List<Poker> push_pokers) {
        List<Poker> pokers = new ArrayList<>(push_pokers)
        pokers = Poker.orderPoker(pokers)
        int len = pokers.size()
        List<Integer> v_list = new ArrayList<>()
        pokers.each {
            v_list.add(it.card_value)
        }
        if (len <= 4) {    //如果第一个和最后个相同，说明全部相同
            if (pokers.size() > 0 && v_list[0] == v_list[len - 1]) {
                switch (len) {
                    case 1:
                        return PokerType.c1
                    case 2:
                        return PokerType.c2
                    case 3:
                        return PokerType.c3
                    case 4:
                        return PokerType.c4
                }
            }
            //王炸
            if (len == 2 && v_list.contains(16) && v_list.contains(17)){
                return PokerType.king
            }
            //当第一个和最后个不同时,3带1
            if (len == 4 && ((v_list[0] == v_list[len - 2]) || v_list[1] == v_list[len - 1])){
                return PokerType.c31
            }
            else {
                return PokerType.c0
            }
        }
        //当5张以上时，顺子，3带2，飞机，2顺，4带2等等
        if (len >= 5) {//现在按相同数字最大出现次数
            Poker_index Poker_index = new Poker_index()
            for (int i = 0; i < 4; i++){
                Poker_index.a[i] = new ArrayList<Integer>()
            }
            //求出各种数字出现频率
            getMax(Poker_index, v_list, len) //a[0,1,2,3]分别表示重复1,2,3,4次的牌
            //3带2 -----必含重复3次的牌
            if (Poker_index.a[2].size() == 1 && Poker_index.a[1].size() == 1 && len == 5){
                return PokerType.c32
            }
            //4带2(单,双)
            if (Poker_index.a[3].size() == 1 && len == 6){
                return PokerType.c411
            }
            if (Poker_index.a[3].size() == 1 && Poker_index.a[1].size() == 2 && len == 8){
                return PokerType.c422
            }
            //单连,保证不存在王
            if ((!v_list.contains(16) && !v_list.contains(17)) && (Poker_index.a[0].size() == len) && (v_list[0] - v_list[len - 1] == (len - 1))){
                return PokerType.c123
            }
            //连队
            if ((Poker_index.a[1].size() == (int) (len / 2)) && len % 2 == 0 && len / 2 >= 3 && ((v_list[0]) - (v_list[len - 1]) == (len / 2 - 1))){
                return PokerType.c1122
            }
            //飞机
            if ((Poker_index.a[2].size() == (int) (len / 3)) && (len % 3 == 0) && ((v_list[0]) - (v_list[len - 1]) == (len / 3 - 1))){
                return PokerType.c111222
            }
            //飞机带n单,n/2对
            if ((Poker_index.a[2].size() == (int) (len / 4)) && (((Integer) (Poker_index.a[2].get((int) (len / 4 - 1))) - (Integer) (Poker_index.a[2].get(0))) == len / 4 - 1) && Poker_index.a[1].size() == 0){
                return PokerType.c11122234
            }

            //飞机带n双
            if ((Poker_index.a[2].size() == (int) (len / 5)) && (Poker_index.a[2].size() == (int) len / 5) && (((Integer) (Poker_index.a[2].get((int) (len / 5 - 1))) - (Integer) (Poker_index.a[2].get(0))) == len / 5 - 1) && Poker_index.a[0].size() == 0 && Poker_index.a[3].size() == 0){
                return PokerType.c1112223344
            }
        }
        return PokerType.c0
    }
    //得到最大相同数
    static void getMax(Poker_index Poker_index, List<Integer> v_list, int len) {
        int[] count = new int[14] //1-13各算一种,王算第14种
        for (int i = 0; i < 14; i++)
            count[i] = 0;
        for (int i = 0; i < len; i++) {
            if (v_list[i] == 16 || v_list[i] == 17)
                count[13]++
            else
                count[v_list[i] - 3]++
        }
        for (int i = 0; i < 14; i++) {
            switch (count[i]) {
                case 1:
                    Poker_index.a[0].add(i + 1)
                    break
                case 2:
                    Poker_index.a[1].add(i + 1)
                    break
                case 3:
                    Poker_index.a[2].add(i + 1)
                    break
                case 4:
                    Poker_index.a[3].add(i + 1)
                    break
            }
        }
    }
    //检查牌的是否能出
    static boolean checkPokers(List<Poker> push_pokers, List<Poker> last_push_pokers) {
        PokerType type = jugdePokerType(push_pokers)
        println "牌型为：" + type.name()
        if(last_push_pokers == null || last_push_pokers.size() == 0){
            println "继续出牌（无人要）"
            return type != PokerType.c0
        }else{
            PokerType l_type = jugdePokerType(last_push_pokers)
            //如果张数不同直接过滤
            if (type != PokerType.c4 && type != PokerType.king && push_pokers.size() != last_push_pokers.size()){
                println "张数不同"
                return false
            }
            //比较我的出牌类型
            if (type != l_type) {
                if(l_type == PokerType.king){
                    println "上家王炸"
                    return false
                }else if(type == PokerType.c4 || type == PokerType.king){
                    println "王炸或炸弹"
                    return true
                }else{
                    println "牌型不同"
                    return false
                }
            }
            //单牌,对子,3带,4炸弹
            if (type == PokerType.c1 || type == PokerType.c2 || type == PokerType.c3 || type == PokerType.c4) {
                if (push_pokers[0].card_value <= last_push_pokers[0].card_value){
                    println "单牌,对子,3带,4炸弹：小于或等于上家"
                    return false
                }
            }
            //顺子,连对，飞机裸
            if (type == PokerType.c123 || type == PokerType.c1122 || type == PokerType.c111222) {
                if (push_pokers[0].card_value <= last_push_pokers[0].card_value){
                    println "顺子,连对，飞机裸：小于或等于上家"
                    return false
                }
            }
            //按重复多少排序
            //3带1,3带2 ,飞机带单，双,4带1,2,只需比较第一个就行，独一无二的
            if (type == PokerType.c31 || type == PokerType.c32 || type == PokerType.c411 || type == PokerType.c422 || type == PokerType.c11122234 || type == PokerType.c1112223344) {
                if (getOrderByRepeat(push_pokers) <= getOrderByRepeat(last_push_pokers)){
                    println "3带1,3带2 ,飞机带单，双,4带1,2：小于或等于上家"
                    return false
                }
            }
        }
        return true
    }
    //按照重复次数获得牌最大值
    static int getOrderByRepeat(List<Poker> list) {
        Map<Integer, Integer> map = new HashMap<>()
        list.each {
            if(map.containsKey(it.card_value)){
                map.put(it.card_value, map.get(it.card_value) + 1)
            }else {
                map.put(it.card_value, 1)
            }
        }

        int max = 0
        int count = 0
        map.each {
            if(count < it.getValue()){
                count = it.getValue()
                if(max < it.getKey()){
                    max = it.getKey()
                }
            }
        }
        return max
    }
    //检查是否结束
    static boolean checkPokerIsOver(PlayersPokers groupPokers) {
        if (groupPokers.playerA.size() == 0 || groupPokers.playerB.size() == 0 || groupPokers.playerC.size() == 0) {
            return true
        } else {
            return false
        }
    }
    //牌重复类
    static class Poker_index {
        List[] a = new ArrayList[4] //单张
    }

    static void main(def args) {

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
        Poker poker14 = new Poker(14, 1, "黑桃", 16, "小王", 0)
        Poker poker15 = new Poker(15, 2, "红心", 17, "大王", 0)

        List<Poker> pokers = new ArrayList<>()
//        pokers.add(poker1)
//        pokers.add(poker2)
//        pokers.add(poker3)
//        pokers.add(poker4)
//        pokers.add(poker5)
//        pokers.add(poker6)
//        pokers.add(poker7)
//        pokers.add(poker8)
//        pokers.add(poker9)
//        pokers.add(poker10)
//        pokers.add(poker11)
//        pokers.add(poker12)
//        pokers.add(poker13)
//        pokers.add(poker14)
//        pokers.add(poker15)

        List<Poker> l_pokers = new ArrayList<>()
//        l_pokers.add(poker1)
//        l_pokers.add(poker2)
//        l_pokers.add(poker3)
//        l_pokers.add(poker4)
//        l_pokers.add(poker5)
//        l_pokers.add(poker6)
//        l_pokers.add(poker7)
//        l_pokers.add(poker8)
//        l_pokers.add(poker9)
//        l_pokers.add(poker10)
//        l_pokers.add(poker11)
//        l_pokers.add(poker12)
//        l_pokers.add(poker13)
//        l_pokers.add(poker14)
//        l_pokers.add(poker15)
        boolean flag = checkPokers(pokers, l_pokers)
        println flag
    }
}
