package com.kerwin.mine.system.user.dao

import com.kerwin.mine.system.user.domain.SystemUserInfo
import com.kerwin.mine.system.user.enums.ActiveStatus
import org.apache.ibatis.annotations.Mapper

/**
 * Created by lxu on 2017/12/21.
 */
@Mapper
interface SystemUserMapper {

    /**
     * 插入一条记录
     */
    int insertInfo(SystemUserInfo info)

    /**
     * 根据主键查询一条记录
     */
    SystemUserInfo getInfoByKey(String user_id)

    /**
     * 校验用户名是否存在
     */
    int checkUserExist(String user_id)

    /**
     * 获取用户密码
     */
    String getUserPassword(String user_id)

    /**
     * 根据激活码查询激活状态
     */
    Integer checkCodeStatusByCode(String code)

    /**
     * 根据激活码激活用户
     */
    int updateStatusByCode(String code)

}