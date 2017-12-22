package com.kerwin.mine.system.user.service

import com.kerwin.mine.system.basic.enums.ExceptionEnum
import com.kerwin.mine.system.basic.exception.MineSystemException
import com.kerwin.mine.system.basic.utils.TimeUtil
import com.kerwin.mine.system.basic.utils.UUID
import com.kerwin.mine.system.user.domain.SystemUserInfo
import com.kerwin.mine.system.user.enums.ActiveStatus
import com.kerwin.mine.system.user.dao.SystemUserMapper
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Created by lxu on 2017/12/21.
 */
@Slf4j
@Service
class UserService {

    @Autowired
    private SystemUserMapper userMapper

    /**
     * 插入一条记录
     */
    int insertInfo(SystemUserInfo userInfo) {
        try {
            userInfo.setCrt_time(TimeUtil.timeStamp)
            userInfo.setMod_time(TimeUtil.timeStamp)
            userInfo.setCode(UUID.getUUID() + UUID.getUUID())
            userInfo.setStatus(ActiveStatus.INACTIVE)
            userMapper.insertInfo(userInfo)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

    /**
     * 根据主键查询一条记录
     */
    SystemUserInfo getInfoByKey(String user_id) {
        try {
            userMapper.getInfoByKey(user_id)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

    /**
     * 校验用户名是否存在
     */
    int checkUserExist(String user_id){
        try {
            userMapper.checkUserExist(user_id)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

    /**
     * 获取用户密码
     */
    String getUserPassword(String user_id){
        try {
            userMapper.getUserPassword(user_id)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

    /**
     * 根据激活码查询激活状态
     */
    int checkCode(String code){
        try {
            userMapper.checkCodeStatusByCode(code)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

    /**
     * 根据激活码激活用户
     */
    int updateStatusByCode(String code){
        try {
            userMapper.updateStatusByCode(code)
        } catch (Exception e) {
            log.error(e.toString())
            throw new MineSystemException(ExceptionEnum.DATA_ERROR)
        }
    }

}
