package com.kerwin.mine.system.user.enums

/**
 * 用户激活状态
 * Created by lxu on 2017/12/22.
 */
enum ActiveStatus {

    //未激活
    INACTIVE(0, "INACTIVE"),
    //激活
    ACTIVATION(1, "ACTIVATION")

    int value
    String name

    ActiveStatus(int value, String name) {
        this.value = value
        this.name = name
    }

    @Override
    String toString() {
        return this.name + "[" + this.value + "]"
    }
}
