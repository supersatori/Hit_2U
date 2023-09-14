package kr.co.hit.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.hit.dao.MessageDao;
import kr.co.hit.dto.MessageDto;

@Service
public class MessageService implements MessageDao{
	
	@Autowired
	private SqlSession sqlsession;

	@Override
	public List<MessageDto> selectMessageList() {
		MessageDao dao = sqlsession.getMapper(MessageDao.class);
		List<MessageDto> list = new ArrayList<MessageDto>();
		list = dao.selectMessageList();
		return list;
	}

	@Override
	public int sendMessage(MessageDto dto) {
		int res = 0;
		MessageDao dao = sqlsession.getMapper(MessageDao.class);
		res = dao.sendMessage(dto);
		return res;
	}

	@Override
	public List<MessageDto> selectSendList() {
		MessageDao dao = sqlsession.getMapper(MessageDao.class);
		List<MessageDto> list = new ArrayList<MessageDto>();
		list = dao.selectSendList();
		return list;
	}
	
	

}
