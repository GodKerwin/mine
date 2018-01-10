package com.kerwin.mine.system.user.domain

import com.kerwin.mine.system.user.enums.ActiveStatus

/**
 * Created by lxu on 2017/12/21.
 */
class SystemUserInfo implements Serializable {

    /**
     * 用户名
     */
    String user_id

    /**
     * 密码
     */
    String password

    /**
     * 用户昵称
     */
    String user_cn_name

    /**
     * 邮箱
     */
    String email

    /**
     * 手机
     */
    String phone

    /**
     * 创建日期
     */
    int crt_time

    /**
     * 修改日期
     */
    int mod_time

    /**
     * 激活码
     */
    String code

    /**
     * 激活状态
     */
    ActiveStatus status

    /**
     * 用户角色ID
     */
    String role_id

    @Override
    String toString() {
        return "SystemUserInfo{" +
                "user_id='" + user_id + '\'' +
                ", password='" + password + '\'' +
                ", user_cn_name='" + user_cn_name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", crt_time=" + crt_time +
                ", mod_time=" + mod_time +
                ", code='" + code + '\'' +
                ", status=" + status +
                ", role_id='" + role_id + '\'' +
                '}'
    }
}
