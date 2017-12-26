package com.kerwin.mine.game.poker.controller

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.Rollback
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.transaction.annotation.Transactional

/**
 * Created by lxu on 2017/12/26.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback(true)
@Transactional
@AutoConfigureMockMvc
class PokerControllerTest {

    @Autowired
    private MockMvc mockMvc

    String user_id = "testUser"

    @Before
    void testQueryGroupPoker() {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/game/poker/queryGroupPoker.do")
                .param("user_id", user_id))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

    @Test
    void testCallLandlord() {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/game/poker/callLandlord.do")
                .param("player", "playerA")
                .param("user_id", user_id)
                .param("call_flag", "true"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

    @Test
    void testPushPoker() {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/game/poker/pushPoker.do")
                .param("player", "playerB")
                .param("user_id", user_id)
                .param("last_player", "playerA")
                .param("push_pokers", '[{"id":47,"type":4,"type_cname":"方片","card_value":10,"card_cname":"10","choose_flag":0},{"id":21,"type":2,"type_cname":"红心","card_value":10,"card_cname":"10","choose_flag":0}]')
                .param("last_push_pokers", '[{"id":15,"type":2,"type_cname":"红心","card_value":4,"card_cname":"4","choose_flag":0},{"id":2,"type":1,"type_cname":"黑桃","card_value":4,"card_cname":"4","choose_flag":0}]'))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

    @Test
    void testJudgeAI() {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/game/poker/judgeAI.do")
                .param("player", "playerB")
                .param("user_id", user_id)
                .param("last_player", "playerA")
                .param("last_push_pokers", '[{"id":15,"type":2,"type_cname":"红心","card_value":4,"card_cname":"4","choose_flag":0},{"id":2,"type":1,"type_cname":"黑桃","card_value":4,"card_cname":"4","choose_flag":0}]'))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }
}
