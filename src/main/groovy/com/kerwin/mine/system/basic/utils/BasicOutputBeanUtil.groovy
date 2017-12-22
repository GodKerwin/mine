package com.kerwin.mine.system.basic.utils

import com.kerwin.mine.system.basic.domain.BasicOutputBean
import com.kerwin.mine.system.basic.enums.ExceptionEnum

/**
 * Created by lxu on 2017/12/21.
 */
class BasicOutputBeanUtil {

    static BasicOutputBean success(Object obj) {
        ExceptionEnum success = ExceptionEnum.SUCCESS
        BasicOutputBean output = new BasicOutputBean([
                code   : success.code,
                message: success.msg,
                data   : obj
        ])
        return output
    }

    static BasicOutputBean success() {
        success(null)
    }

    static BasicOutputBean error(ExceptionEnum exceptionEnum) {
        BasicOutputBean output = new BasicOutputBean([
                code   : exceptionEnum.code,
                message: exceptionEnum.msg
        ])
        return output
    }

}
