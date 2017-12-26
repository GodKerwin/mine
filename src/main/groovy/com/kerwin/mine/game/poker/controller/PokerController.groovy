package com.kerwin.mine.game.poker.controller

import com.kerwin.mine.game.poker.domain.PlayersPokers
import com.kerwin.mine.game.poker.domain.Poker
import com.kerwin.mine.game.poker.domain.PokerInputBean
import com.kerwin.mine.game.poker.domain.PokerOutputBean
import com.kerwin.mine.game.poker.service.AIService
import com.kerwin.mine.game.poker.service.PokerService
import com.kerwin.mine.system.basic.domain.BasicOutputBean
import com.kerwin.mine.system.basic.enums.ExceptionEnum
import com.kerwin.mine.system.basic.exception.MineSystemException
import com.kerwin.mine.system.basic.utils.BasicOutputBeanUtil
import groovy.util.logging.Slf4j
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by lxu on 2017/12/22.
 */
@Slf4j
@RestController
class PokerController {

    //用户缓存
    private static final Map<String, PlayersPokers> poker_cache = new HashMap<>()

    /**
     * 发牌
     */
    @PostMapping("/game/poker/queryGroupPoker.do")
    BasicOutputBean queryGroupPoker(PokerInputBean input) {
        log.info "-----------------queryGroupPoker Begin-----------------"
        PokerOutputBean output = new PokerOutputBean()

        try {
            //创建扑克
            PlayersPokers groupPokers = Poker.groupPoker()
            output.setGroupPokers(groupPokers)
            //录入缓存
            poker_cache.put(input.user_id, groupPokers)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.SYSTEM_BUSY)
        }

        log.info "-----------------queryGroupPoker End-----------------"
        return BasicOutputBeanUtil.success(output)
    }

    /**
     * 叫地主
     */
    @PostMapping("/game/poker/callLandlord.do")
    BasicOutputBean callLandlord(PokerInputBean input) {
        log.info "-----------------callLandlord Begin-----------------"
        PokerOutputBean output = new PokerOutputBean()

        try {
            String player = input.player
            PlayersPokers groupPokers = poker_cache.get(input.user_id)
            //若玩家不抢地主，则AI根据权重判断是否抢地主，此处暂定玩家为A，电脑依次为B、C
            if (!input.call_flag) {
                player = AIService.judgeLord(groupPokers)
            }
            if (player == "playerA") {
                groupPokers.playerA.addAll(groupPokers.hideCards)
                groupPokers.setPlayerA(Poker.orderPoker(groupPokers.playerA))
            } else if (player == "playerB") {
                groupPokers.playerB.addAll(groupPokers.hideCards)
                groupPokers.setPlayerB(Poker.orderPoker(groupPokers.playerB))
            } else if (player == "playerC") {
                groupPokers.playerC.addAll(groupPokers.hideCards)
                groupPokers.setPlayerC(Poker.orderPoker(groupPokers.playerC))
            }
            poker_cache.put(input.user_id, groupPokers)
            output.setGroupPokers(groupPokers)
            output.setPlayer(player)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.SYSTEM_BUSY)
        }

        log.info "-----------------callLandlord End-----------------"
        return BasicOutputBeanUtil.success(output)
    }

    /**
     * 出牌
     */
    @PostMapping("/game/poker/pushPoker.do")
    BasicOutputBean pushPoker(PokerInputBean input) {
        PokerOutputBean output = new PokerOutputBean()
        log.info "-----------------pushPoker Begin-----------------"

        try {
            PlayersPokers groupPokers = poker_cache.get(input.user_id)
            String player = input.player
            String last_player = input.last_player
            List<Poker> push_pokers = PokerInputBean.parseJsonToObj(input.push_pokers)
            List<Poker> last_push_pokers = PokerInputBean.parseJsonToObj(input.last_push_pokers)
            log.debug "[${player}]待出牌：" + push_pokers

            //若没人要牌，则清空上次出牌记录，可以随意出牌
            if (player == last_player) {
                last_push_pokers = null
            }

            if (PokerService.checkPokers(push_pokers, last_push_pokers)) {
                if (player == "playerA") {
                    groupPokers.setPlayerA(PokerService.removePoker(groupPokers.playerA, push_pokers))
                } else if (player == "playerB") {
                    groupPokers.setPlayerB(PokerService.removePoker(groupPokers.playerB, push_pokers))
                } else {
                    groupPokers.setPlayerC(PokerService.removePoker(groupPokers.playerC, push_pokers))
                }
                poker_cache.put(input.user_id, groupPokers)
                output.setLegal_flag(true)
                output.setOver_flag(PokerService.checkPokerIsOver(groupPokers))
            } else {
                log.debug "[${player}]待出牌未大过上家，不能出牌"
                output.setLegal_flag(false)
            }
            output.setGroupPokers(groupPokers)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.SYSTEM_BUSY)
        }

        log.info "-----------------pushPoker End-----------------"
        return BasicOutputBeanUtil.success(output)
    }

    /**
     * AI判断出牌
     */
    @PostMapping("/game/poker/judgeAI.do")
    BasicOutputBean judgeAI(PokerInputBean input) {
        log.info "-----------------judgeAI Begin-----------------"
        PokerOutputBean output = new PokerOutputBean()

        try {
            PlayersPokers groupPokers = poker_cache.get(input.user_id)
            String player = input.player
            String last_player = input.last_player
            List<Poker> last_push_pokers = PokerInputBean.parseJsonToObj(input.last_push_pokers)
            List<Poker> push_pokers = new ArrayList<>()

            if (player.equals("playerA")) {
                push_pokers = AIService.showCard(groupPokers.playerA, last_push_pokers, player.equals(last_player))
            } else if (player.equals("playerB")) {
                push_pokers = AIService.showCard(groupPokers.playerB, last_push_pokers, player.equals(last_player))
            } else if (player.equals("playerC")) {
                push_pokers = AIService.showCard(groupPokers.playerC, last_push_pokers, player.equals(last_player))
            }
            output.setPush_pokers(push_pokers)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.SYSTEM_BUSY)
        }

        log.info "-----------------judgeAI End-----------------"
        return BasicOutputBeanUtil.success(output)
    }

}
