package com.kerwin.mine.game.poker.domain

import groovy.util.logging.Slf4j

/**
 * 扑克类
 * Created by lxu on 2017/12/22.
 */
@Slf4j
class Poker implements Comparable<Poker>, Serializable{

    //将扑克分组
    static PlayersPokers groupPoker() {
        //生成扑克
        List<Poker> pokers = generatePoker()
        PlayersPokers groupPokers = new PlayersPokers()
        List<Poker> playerA = new ArrayList<>()
        List<Poker> playerB = new ArrayList<>()
        List<Poker> playerC = new ArrayList<>()
        List<Poker> hideCards = new ArrayList<>()
        for (def i = 0; i < pokers.size(); i++) {
            if (i >= 51) {
                hideCards.add(pokers.get(i))
            } else if (i % 3 == 0) {
                playerA.add(pokers.get(i))
            } else if (i % 3 == 1) {
                playerB.add(pokers.get(i))
            } else if (i % 3 == 2) {
                playerC.add(pokers.get(i))
            }
        }
        groupPokers.setPlayerA(orderPoker(playerA))
        groupPokers.setPlayerB(orderPoker(playerB))
        groupPokers.setPlayerC(orderPoker(playerC))
        groupPokers.setHideCards(hideCards)
        log.debug "生成扑克"
        return groupPokers
    }

    //排序
    static ArrayList<Poker> orderPoker(List<Poker> pokers) {
        for (int i = 0; i < pokers.size(); i++) {
            for (int j = i; j < pokers.size(); j++) {
                if (pokers[i].card_value < pokers[j].card_value || (pokers[i].card_value == pokers[j].card_value && pokers[i].type < pokers[j].type)) {
                    Poker temp = pokers[i]
                    pokers[i] = pokers[j]
                    pokers[j] = temp
                }
            }
        }
        return pokers
    }

    //获得一副扑克
    private static ArrayList<Poker> generatePoker() {
        def pokers = new ArrayList<Poker>()
        //分别生成四种花色
        int count = 1
        for (def i = 1; i < 5; i++) {
            //生成每个花色13张牌
            for (def j = 3; j < 16; j++) {
                pokers.add(new Poker(count, i, type_map.get(i), j, card_map.get(j), 0))
                count++
            }
        }
        //生成大小王
        pokers.add(new Poker(count++, 0, type_map.get(0), 16, card_map.get(16), 0))
        pokers.add(new Poker(count, 0, type_map.get(0), 17, card_map.get(17), 0))
        return washPoker(pokers)
    }

    //洗牌
    private static ArrayList<Poker> washPoker(List<Poker> pokers) {
        List<Poker> washedPokers = new ArrayList<>()
        Random random = new Random()
        int count = 0
        while (count < pokers.size()) {
            int rand = random.nextInt(54)
            if (!washedPokers.contains(pokers.get(rand))) {
                washedPokers.add(pokers.get(rand))
                count++
            }
        }
        return washedPokers
    }

    /**
     * id
     */
    int id

    /**
     * 花色 ： 0无、1黑桃、2红心、3草花、4方片
     */
    int type

    /**
     * 花色中文名
     */
    String type_cname

    /**
     * 扑克数值大小 （3-10正常对应3-10，11对应J，12对应Q，13对应K，14对应A，15对应2，16对应小王，17对应大王）
     */
    int card_value

    /**
     * 扑克显示文字
     */
    String card_cname

    /**
     * 0未选 1选中
     */
    int choose_flag

    //花色对应列表
    static Map<Integer, String> type_map

    //扑克数值对应列表
    static Map<Integer, String> card_map

    static {
        type_map = new HashMap<>()
        type_map.put(0, "")
        type_map.put(1, "黑桃")
        type_map.put(2, "红心")
        type_map.put(3, "草花")
        type_map.put(4, "方片")

        card_map = new HashMap<>()
        card_map.put(3, "3")
        card_map.put(4, "4")
        card_map.put(5, "5")
        card_map.put(6, "6")
        card_map.put(7, "7")
        card_map.put(8, "8")
        card_map.put(9, "9")
        card_map.put(10, "10")
        card_map.put(11, "J")
        card_map.put(12, "Q")
        card_map.put(13, "K")
        card_map.put(14, "A")
        card_map.put(15, "2")
        card_map.put(16, "小王")
        card_map.put(17, "大王")
    }

    @Override
    int compareTo(Poker poker) {
        println "compareTo-poker : " + this.toString()
        println "compareTo-poker : " + poker.toString()
        if (poker == null) {
            println "poker null!!!"
            return 1
        }
        int value = poker.card_value - this.card_value
        println "poker-value : " + value
        if (value == 0) {
            println "poker-value 0 "
            value = this.type - poker.type
        }
        println "compareTo-value" + value
        return value
    }

    @Override
    String toString() {
        return "[" + type_cname + card_cname + "]"
    }

    static main(def args) {
        PlayersPokers pokers = groupPoker()
        println pokers.playerA.toString()
        println pokers.playerB.toString()
        println pokers.playerC.toString()
        println pokers.hideCards.toString()
    }
}
