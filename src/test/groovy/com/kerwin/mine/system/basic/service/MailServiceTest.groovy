package com.kerwin.mine.system.basic.service

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

/**
 * Created by lxu on 2017/12/22.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
class MailServiceTest {

    @Autowired
    private MailService mailService

    @Test
    void sendMail() throws Exception {
        //为避免每次构建都发送邮件，故注释，单测可解除注释
//        mailService.sendMail("513624876@qq.com", "test code 1234567890")
    }

}