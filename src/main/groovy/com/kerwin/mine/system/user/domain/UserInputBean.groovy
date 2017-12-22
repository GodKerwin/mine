package com.kerwin.mine.system.user.domain

import com.kerwin.mine.system.basic.domain.BasicInputBean

/**
 * Created by lxu on 2017/12/21.
 */
class UserInputBean extends BasicInputBean {

    /**
     * 用户信息
     */
    SystemUserInfo systemUserInfo

    /**
     * 用户名
     */
    String user_id

    /**
     * 密码
     */
    String password

    /**
     * 激活码
     */
    String code

    @Override
    String toString() {
        return "UserInputBean{" +
                "systemUserInfo=" + systemUserInfo +
                ", user_id='" + user_id + '\'' +
                ", password='" + password + '\'' +
                ", code='" + code + '\'' +
                '}'
    }
}
