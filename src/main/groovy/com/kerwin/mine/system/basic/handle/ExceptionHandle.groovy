package com.kerwin.mine.system.basic.handle

import com.kerwin.mine.system.basic.domain.BasicOutputBean
import com.kerwin.mine.system.basic.enums.ExceptionEnum
import com.kerwin.mine.system.basic.exception.MineSystemException
import com.kerwin.mine.system.basic.utils.BasicOutputBeanUtil
import groovy.util.logging.Slf4j
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Created by lxu on 2017/12/26.
 */
@Slf4j
@ControllerAdvice
class ExceptionHandle {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    BasicOutputBean handle(Exception e) {
        if (e instanceof MineSystemException) {
            return BasicOutputBeanUtil.error((e as MineSystemException).code, e.message)
        } else {
            log.error("【系统异常】{}", e.toString())
            return BasicOutputBeanUtil.error(ExceptionEnum.UNKNOW_ERROR.code, ExceptionEnum.UNKNOW_ERROR.msg)
        }
    }

}
