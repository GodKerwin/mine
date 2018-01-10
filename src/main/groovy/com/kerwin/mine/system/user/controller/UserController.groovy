package com.kerwin.mine.system.user.controller

import com.kerwin.mine.system.basic.domain.BasicOutputBean
import com.kerwin.mine.system.basic.enums.ExceptionEnum
import com.kerwin.mine.system.basic.exception.MineSystemException
import com.kerwin.mine.system.basic.service.MailService
import com.kerwin.mine.system.basic.utils.BasicOutputBeanUtil
import com.kerwin.mine.system.basic.utils.MD5Util
import com.kerwin.mine.system.user.domain.SystemUserInfo
import com.kerwin.mine.system.user.domain.UserInputBean
import com.kerwin.mine.system.user.enums.ActiveStatus
import com.kerwin.mine.system.user.service.UserService
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by lxu on 2017/12/21.
 */
@Slf4j
@RestController
class UserController {

    @Autowired
    private UserService userService
    @Autowired
    private MailService mailService

    //用户注册
    @PostMapping("/system/user/userRegister.do")
    BasicOutputBean userRegister(UserInputBean input) {
        log.info "-----------------UserRegister Begin-----------------"
        SystemUserInfo userInfo = input?.systemUserInfo

        //校验用户名是否被占用
        if (userService.checkUserExist(userInfo?.user_id) != 0) {
            log.error "用户注册异常!!! 用户名${userInfo?.user_id}已被占用"
            throw new MineSystemException(ExceptionEnum.USER_EXIST)
        }

        //新增用户表
        userService.insertInfo(userInfo)

        //发送激活邮件
        log.debug "向用户${userInfo?.user_id}发送激活邮件"
        mailService.sendMail(userInfo?.email, userInfo?.code)

        log.debug "用户${userInfo?.user_id}注册成功"
        log.info "-----------------UserRegister End-----------------"
        return BasicOutputBeanUtil.success()
    }

    //用户登录
    @PostMapping("/system/user/userLogin.do")
    BasicOutputBean userLogin(UserInputBean input) {
        log.info "-----------------userLogin Begin-----------------"
        String user_id = input.user_id
        String password = input.password

        //登录校验
        SystemUserInfo userInfo = checkLogin(user_id, password)
        //返回用户ID及用户角色ID
        SystemUserInfo data = new SystemUserInfo([
                user_id: user_id,
                role_id: userInfo.role_id
        ])

        log.debug "用户${user_id} 登录成功"
        log.info "-----------------userLogin End-----------------"
        return BasicOutputBeanUtil.success(data)
    }

    //登录校验
    private SystemUserInfo checkLogin(String user_id, String password) {
        log.debug "用户${user_id} 尝试登录"
        SystemUserInfo userInfo = userService.getInfoByKey(user_id)
        //校验用户ID
        log.debug("进行用户密码校验")
        if (userService.checkUserExist(user_id) == 0) {
            log.error "用户登录异常!!! 用户名:${user_id} 错误"
            throw new MineSystemException(ExceptionEnum.LOGIN_ERROR)
        }

        //校验用户密码
        String tb_password = userService.getUserPassword(user_id)
        if (!tb_password.equals(MD5Util.encode(password))) {
            log.error "用户登录异常!!! 用户密码:${password} 错误"
            throw new MineSystemException(ExceptionEnum.LOGIN_ERROR)
        }

        //校验激活状态
        log.debug("进行激活状态校验")
        if (userInfo?.status == ActiveStatus.INACTIVE) {
            log.error "用户登录异常!!! 账户邮箱未激活"
            throw new MineSystemException(ExceptionEnum.ACCOUNT_INACTIVE)
        }
        return userInfo
    }

    @PostMapping("/system/user/activeUser.do")
    BasicOutputBean activeUser(UserInputBean input) {
        log.info "-----------------UserRegister Begin-----------------"
        String code = input.code

        //校验激活码
        if (code) {
            Integer status = userService.checkCodeStatusByCode(code)
            if (status == ActiveStatus.INACTIVE.value) {
                userService.updateStatusByCode(code)
                log.debug "激活用户成功!"
            } else if (status == ActiveStatus.ACTIVATION.value) {
                throw new MineSystemException(ExceptionEnum.ACCOUNT_ACTIVATION)
            } else {
                throw new MineSystemException(ExceptionEnum.ACTIVECODE_NOT_EXIST)
            }
        } else {
            throw new MineSystemException(ExceptionEnum.ACTIVECODE_NOT_EXIST)
        }

        log.info "-----------------UserRegister End-----------------"
        return BasicOutputBeanUtil.success()
    }
}
