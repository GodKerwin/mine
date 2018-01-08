package com.kerwin.mine.system.basic.utils

class UUID {

    /**
     * 生成UUID
     */
    static String getUUID() {
        java.util.UUID.randomUUID().toString().replaceAll("-", "")
    }

    /**
     * 生成激活码
     */
    static String getCode() {
        getUUID() + getUUID()
    }
}
