package com.kerwin.mine.system.basic.utils

class UUID {

    static String getUUID(){
        java.util.UUID.randomUUID().toString().replaceAll("-", "")
    }
}
