package com.kerwin.mine.game.poker.domain

import com.alibaba.fastjson.JSON
import com.kerwin.mine.system.basic.domain.BasicInputBean

/**
 * Created by lxu on 2017/12/22.
 */
class PokerInputBean extends BasicInputBean{

    /**
     * 用户名
     */
    String user_id

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
}
