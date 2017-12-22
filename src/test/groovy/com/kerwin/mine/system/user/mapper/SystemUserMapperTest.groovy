package com.kerwin.mine.system.user.mapper

import com.kerwin.mine.system.basic.utils.TimeUtil
import com.kerwin.mine.system.user.dao.SystemUserMapper
import com.kerwin.mine.system.user.domain.SystemUserInfo
import com.kerwin.mine.system.user.enums.ActiveStatus
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

/**
 * Created by lxu on 2017/12/22.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
class SystemUserMapperTest {

    @Autowired
    private SystemUserMapper userMapper

    String user_id = "testUser"
    String password = 111111
    String code = "active_code"

    @Before
    void insertInfo() {
        SystemUserInfo userInfo = new SystemUserInfo([
                user_id : user_id,
                password: password,
                user_cn_name : "测试用户",
                email : "111@test.com",
                phone : "11112222333",
                crt_time : TimeUtil.timeStamp,
                mod_time : TimeUtil.timeStamp,
                code : code,
                status : ActiveStatus.INACTIVE
        ])
        userMapper.insertInfo(userInfo)
    }

    @Test
    void getInfoByKey() {
        SystemUserInfo userInfo = userMapper.getInfoByKey(user_id)
        println userInfo
        Assert.assertEquals(userInfo.password, password)
    }

    @Test
    void checkUserExist() {
        int count = userMapper.checkUserExist(user_id)
        Assert.assertEquals(count, 1)
    }

    @Test
    void getUserPassword() {
        String t_password = userMapper.getUserPassword(user_id)
        Assert.assertEquals(t_password, password)
    }

    @Test
    void checkCode() {
        int status = userMapper.checkCode(user_id)
        Assert.assertEquals(status, ActiveStatus.INACTIVE.value)
    }

    @Test
    void updateStatusByCode() {
        int count = userMapper.updateStatusByCode(code)
        Assert.assertEquals(count, 1)
    }

}
