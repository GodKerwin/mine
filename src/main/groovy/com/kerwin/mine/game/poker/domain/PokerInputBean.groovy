package com.kerwin.mine.game.poker.domain

import com.alibaba.fastjson.JSON
import com.kerwin.mine.system.basic.domain.BasicInputBean

/**
 * Created by lxu on 2017/12/22.
 */
class PokerInputBean extends BasicInputBean{

    /**
     * 玩家
     */
    String player

    /**
     * 出牌列表
     */
    String push_pokers

    /**
     * 上次出牌玩家
     */
    String last_player

    /**
     * 上次出牌列表
     */
    String last_push_pokers

    /**
     * 是否叫地主
     */
    boolean call_flag

    static List<Poker> parseJsonToObj(String json) {
        return (List<Poker>) JSON.parse(json)
    }

    @Override
    String toString() {
        return "PokerInputBean{" +
                "user_id='" + user_id + '\'' +
                ", player='" + player + '\'' +
                ", push_pokers='" + push_pokers + '\'' +
                ", last_player='" + last_player + '\'' +
                ", last_push_pokers='" + last_push_pokers + '\'' +
                ", call_flag=" + call_flag +
                '}'
    }
}
