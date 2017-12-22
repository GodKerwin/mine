package com.kerwin.mine.game.poker.domain

/**
 * 牌模型
 * Created by lxu on 2017/12/22.
 */
class AIPokerModel implements Serializable{

    /**
     * 权值
     */
    int value

    /**
     * 手数 (几次能够走完，没有挡的情况下)
     */
    int num

    /**
     * 单张
     */
    List<String> a1 = new ArrayList<String>()

    /**
     * 对子
     */
    List<String> a2 = new ArrayList<String>()

    /**
     * 3不带
     */
    List<String> a3 = new ArrayList<String>()

    /**
     * 顺子
     */
    List<String> a123 = new ArrayList<String>()

    /**
     * 连对
     */
    List<String> a112233 = new ArrayList<String>()

    /**
     * 飞机
     */
    List<String> a111222 = new ArrayList<String>()

    /**
     * 炸弹
     */
    List<String> a4 = new ArrayList<String>()

    @Override
    String toString() {
        return "AIPokerModel{" +
                "value=" + value +
                ",\r\n num=" + num +
                ",\r\n a1=" + a1 +
                ",\r\n a2=" + a2 +
                ",\r\n a3=" + a3 +
                ",\r\n a123=" + a123 +
                ",\r\n a112233=" + a112233 +
                ",\r\n a111222=" + a111222 +
                ",\r\n a4=" + a4 +
                '}'
    }

}
