$(document).ready(function(){
	/*Danh sách user*/
	$.ajax({
		method:"GET",
		url:"/api/admin/list"
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let result=$('<div class="Result"></div>').data('userId',res[i]["userId"]);
			result.append('<div class="Account"><div class="Avatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
			if(res[i]["blocked"]){
				result.append('<div class="Action"><button class="Buttons Unlock">Unlock</button></div>');
			}
			else result.append('<div class="Action"><button class="Buttons Block">Block</button></div>');
			$('.Results').append(result);
		}
	}).fail(function(err){
		console.log(err);
	});

	/*Tìm kiếm user*/
	$('button#search').on('click',function(){
		let keyWord=$('input#searchInput').val();
		$('.Results').html('');
		$.ajax({
			method:"GET",
			url:"/api/notifi/search/"+keyWord
		}).done(function(res){
			for(let i=0;i<res.length;i++){
				let result=$('<div class="Result"></div>').data('userId',res[i]["userId"]);
				result.append('<div class="Account"><div class="Avatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
				if(res[i]["blocked"]){
					result.append('<div class="Action"><button class="Buttons Unlock">Unlock</button></div>');
				}
				else result.append('<div class="Action"><button class="Buttons Block">Block</button></div>');

				$('.Results').append(result);
			}
		}).fail(function(err){
			console.log(err);
		});
	});

	/*Block, Unlock user*/
	$(document).on('click','.Block',function(){
		let id=$(this).parent().parent().data('userId');
		$(this).text('Unlock');
		$(this).removeClass('Block');
		$(this).addClass('Unlock');
		$.ajax({
			method:"PUT",
			url:"/api/admin/block/"+id
		}).fail((err)=>{
			console.log(err);
		});
	});
	$(document).on('click','.Unlock',function(){
		let id=$(this).parent().parent().data('userId');
		$(this).text('Block');
		$(this).removeClass('Unlock');
		$(this).addClass('Block');
		$.ajax({
			method:"PUT",
			url:"/api/admin/unlock/"+id
		}).fail((err)=>{
			console.log(err);
		});
	});
},false);