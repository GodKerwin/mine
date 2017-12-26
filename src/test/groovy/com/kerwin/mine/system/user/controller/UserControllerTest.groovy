package com.kerwin.mine.system.user.controller

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
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc

    //为避免重复发邮件，故注释，单测可解开注释
//    @Test
    void testUserRegister() throws Exception {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/system/user/userRegister.do")
                .param("systemUserInfo.user_id","testUser")
                .param("systemUserInfo.password","111111")
                .param("systemUserInfo.user_cn_name","测试用户")
                .param("systemUserInfo.email","111@test.com")
                .param("systemUserInfo.phone","11112222333"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

    @Test
    void testUserLogin() throws Exception {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/system/user/userLogin.do").param("user_id", 'testlogin').param("password","111111"))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

    @Test
    void testActiveUser() throws Exception {
        String responseString = mockMvc.perform(MockMvcRequestBuilders.post("/system/user/activeUser.do").param("code", '8691d03479954f1b9a3a66b501803ddc2ed0fe2f63114ab8b1e9ec6a3096acfd'))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString()
        println "response" + responseString
    }

}
