package ml.market.cors.controller.api.board.notic;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import ml.market.cors.domain.board.service.NoticeBoardService;
import ml.market.cors.domain.board.enums.eNoticeBoardKey;
import ml.market.cors.domain.security.member.JwtCertificationToken;
import ml.market.cors.domain.util.Message;
import ml.market.cors.domain.util.ResponseEntityUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
class NoticeBoardList{
    private final List<Map<eNoticeBoardKey, String>> noticeList;
    private final String totalPage;
}

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeBoardController {
    private final ResponseEntityUtils responseEntityUtils;

    private final NoticeBoardService noticeBoardService;

    @GetMapping("/view/{noticeId}")
    public ResponseEntity<Message<Object>> view(@PathVariable("noticeId") long noticeId){
        ResponseEntity<Message<Object>> messageResponseEntity = null;
        Map<eNoticeBoardKey, String> noticeBoardItem = noticeBoardService.view(noticeId);
        if(noticeBoardItem == null){
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityNotFound("존재안함");
        }else{
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityOK(noticeBoardItem);
        }
        return messageResponseEntity;
    }


    @GetMapping()
    public ResponseEntity<Message<Object>> list(@RequestParam("page") int pageIndex){
        List<Map<eNoticeBoardKey, String>> noticeBoardList= noticeBoardService.list(pageIndex);
        int noticeBoardSz = noticeBoardList.size();
        Map<eNoticeBoardKey, String> tempMap;
        if(noticeBoardSz > 0){
            noticeBoardSz = noticeBoardSz - 1;
        }
        tempMap = noticeBoardList.get(noticeBoardSz);
        noticeBoardList.remove(noticeBoardSz);
        String totalPage = tempMap.get(eNoticeBoardKey.totalPage);
        NoticeBoardList result = new NoticeBoardList(noticeBoardList, totalPage);
        ResponseEntity<Message<Object>> messageResponseEntity = responseEntityUtils.getMessageResponseEntityOK(result);
        return messageResponseEntity;
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Message<Object>> save(@RequestParam("title") String title, @RequestParam("content") String content
            ,@AuthenticationPrincipal JwtCertificationToken jwtCertificationToken){
        ResponseEntity<Message<Object>> messageResponseEntity;
        long memberId =(Long)jwtCertificationToken.getCredentials();
        boolean bResult = noticeBoardService.save(title,content, memberId);
        if(bResult) {
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityOK("ok");
        }else{
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityBadRequest("저장 실패");
        }
        return messageResponseEntity;
    }

    @DeleteMapping()
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Message<Object>> delete(@RequestParam("noticeId") long noticeId){
        ResponseEntity<Message<Object>> messageResponseEntity;
        boolean bResult = noticeBoardService.delete(noticeId);
        if(bResult){
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityOK("ok");
        }else{
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityBadRequest("삭제 실패");
        }
        return messageResponseEntity;
    }

    @PutMapping()
    @Secured("ROLE_ADMIN")
    public ResponseEntity<Message<Object>> update(@AuthenticationPrincipal JwtCertificationToken jwtCertificationToken
            ,@RequestParam("title") String title, @RequestParam("content") String content
            , @RequestParam("noticeId") long noticeId){
        ResponseEntity<Message<Object>> messageResponseEntity;
        long memberId =(long) jwtCertificationToken.getCredentials();
        boolean bResult = noticeBoardService.update(title, content, noticeId, memberId);
        if(bResult){
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityOK("ok");
        }else{
            messageResponseEntity = responseEntityUtils.getMessageResponseEntityBadRequest("삭제 실패");
        }
        return messageResponseEntity;
    }
}
