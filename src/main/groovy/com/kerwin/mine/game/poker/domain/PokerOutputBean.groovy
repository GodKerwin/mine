package com.kerwin.mine.game.poker.domain

/**
 * Created by lxu on 2017/12/22.
 */
class PokerOutputBean implements Serializable{

    /**
     * 牌库
     */
    PlayersPokers groupPokers

    /**
     * 出牌是否合法
     */
    boolean legal_flag

    /**
     * 是否打完
     */
    boolean over_flag

    /**
     * 出牌列表
     */
    List<Poker> push_pokers

    /**
     * 地主玩家
     */
    String player

    /**
     * 出牌类型
     c1,//单牌。
     c2,//对子。
     c3,//3不带。
     c4,//炸弹。
     c31,//3带1。
     c32,//3带2。
     c411,//4带2个单，或者一对
     c422,//4带2对
     c123,//连子。
     c1122,//连队。
     c111222,//飞机。
     c11122234,//飞机带单排.
     c1112223344,//飞机带对子.
     king,//王炸
     */
    String push_type


    @Override
    String toString() {
        return "PokerOutputBean{" +
                "groupPokers=" + groupPokers +
                ", legal_flag=" + legal_flag +
                ", over_flag=" + over_flag +
                ", push_pokers=" + push_pokers +
                ", player='" + player + '\'' +
                ", push_type='" + push_type + '\'' +
                '}'
    }
}
