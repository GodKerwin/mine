package com.kerwin.mine.game.poker.domain

/**
 * 玩家手牌
 * Created by lxu on 2017/12/22.
 */
class PlayersPokers implements Serializable{

    /**
     * 玩家A手牌
     */
    List<Poker> playerA

    /**
     * 玩家B手牌
     */
    List<Poker> playerB

    /**
     * 玩家C手牌
     */
    List<Poker> playerC

    /**
     * 底牌
     */
    List<Poker> hideCards

    @Override
    String toString() {
        return "PlayersPokers{" +
                "playerA=" + playerA +
                ", playerB=" + playerB +
                ", playerC=" + playerC +
                ", hideCards=" + hideCards +
                '}'
    }
}
