$(document).ready(function () {
    $("#cbx_chkAll").click(function () {
        console.log("clicked");
        if ($("#cbx_chkAll").is(":checked")) $("input[name=chk]").prop("checked", true);
        else $("input[name=chk]").prop("checked", false);
    });

    $("input[name=chk]").click(function () {
        var total = $("input[name=chk]").length;
        var checked = $("input[name=chk]:checked").length;

        if (total != checked) $("#cbx_chkAll").prop("checked", false);
        else $("#cbx_chkAll").prop("checked", true);
    });
});



function search(){
	var search_key = $('.searchKey').val();
	console.log(search_key);
	var cat = $("#searchCat option:selected").val();
	console.log(cat);
	var send = {search_key:search_key, cat:cat}

	$.ajax({
		type: "POST",
		url: "/adminSearch",
		contentType: 'application/json',
		data: JSON.stringify(send),
		dataType: 'json',
		success: function(data){
			console.log("search success");
			//location.href = "message_list"; 
            if(data.length==0) $('.tableResult').html('<td colspan="4" style="text-align:center">찾으시는 검색어를 포함한 검색결과가 없습니다. </td>');
			else{
                
            
                if(cat=="1"){
                    console.log(data);
                console.log(data[0].b_title);
                $('.tableResult').empty();
                var tableH = '<tr><th style="width:5%"></th>';
                tableH += '<th style="width:20%">게시판</th><th style="width:55%">제목</th><th style="width:20%">작성날짜</th></tr>';
                //tableH += '<th style="width:15%">  <button onclick="del()" value="1">s</button>  </th></tr>';
                $('.tableHead').empty();
                $('.tableHead').append(tableH);
                
                for(var i in data){
                    console.log(data[i]);
                    str = '<tr class="align-middle"><td><div class="d-flex align-items-center">';
                    str += '<input type="checkbox" class="chk" name="chk" value="'+data[i].b_no+'"></div></td>';
                    str += '<td>'+data[i].cat_name+'</td>';
                    str += '<td>'+data[i].b_title+'</td>';
                    //str += '<td>'+data[i].nickname+'</td>';
                    //<fmt:formatDate value="${ list.m_date }" pattern="yy-MM-dd [HH:mm]" type="date"/>
                    str += '<td>'+data[i].b_write_date+'</td>';
                    $('.tableResult').append(str);
                }
                }
                else{
                    console.log("member----------");
                    console.log(data);
                    console.log(data[0].nickname);
                    $('.tableResult').empty();
                    var tableH = '<tr><th><input type="checkbox"  id="cbx_chkAll" ></th>';
                    tableH += '<th>ID</th><th>닉네임</th><th>권한</th></tr>';
                    $('.tableHead').empty();
                    $('.tableHead').append(tableH);
                    for(var i in data){
                        console.log(data[i]);
                        str = '<tr class="align-middle"><td><div class="d-flex align-items-center">';
                        str += '<input type="checkbox" class="chk" name="chk" value="'+data[i].member_no+'"></div></td>';
                        str += '<td>'+data[i].member_id+'</td>';
                        str += '<td>'+data[i].nickname+'</td>';
                        str += '<td>'+data[i].authority+'</td>';
                        $('.tableResult').append(str);
                    }
                }
			
			}

			}
	});
	
}

function del() {
	// var cat = $("#searchCat option:selected").val();
	// console.log(cat);

	Swal.fire({
		title: '삭제하시겠습니까?',
		text: '선택한 정보가 삭제됩니다.',
		icon: 'warning',
		
		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
		cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
		confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
		
		//reverseButtons: true, // 버튼 순서 거꾸로
		
	}).then(result => {
	// 만약 Promise리턴을 받으면,
	if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
		var checkArr = new Array();
		var m_no={};
		$("input[class='chk']:checked").each(function(){
			//m_no = {"m_no": $(this).val()};
			//checkArr.push(m_no);
			checkArr.push($(this).val());
		});
        checkArr.push($("#searchCat option:selected").val());
		console.log(checkArr);
		$.ajax({
		type: "POST",
		url: "admin_del",
		contentType: 'application/json',
		data: JSON.stringify(checkArr),
		success: function(){
			console.log("delete success");
			//location.href = "message_list";
			
			search();

			}
		});  

		Swal.fire('삭제가 완료되었습니다.',  'success');
	}
	});


}
