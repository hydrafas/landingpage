
	function showSimulation(){
       $('#divMain').hide();
       $('#simulationDiv').show();
       
    }
	
	function back2(){
	       $('#divMain').show();
	       $('#simulationDiv').hide();
	       window.location.href = "https://rumahimpian.id/landing/";
	 }

	function validate(evt) {
		var theEvent = evt || window.event;
		
		// Handle paste
		if (theEvent.type === 'paste') {
			key = event.clipboardData.getData('text/plain');
		} else {
		// Handle key press
			var key = theEvent.keyCode || theEvent.which;
			key = String.fromCharCode(key);
		}
		var regex = /[0-9]|\.,/;
		if( !regex.test(key) ) {
			theEvent.returnValue = false;
			if(theEvent.preventDefault) theEvent.preventDefault();
		}
	}
	
	function generateLink(){
		var kodeAO = $('#txtKodeAO').val();
		if(kodeAO){
			if(kodeAO.length<8){
				$('#exampleModalLabel').text('Peringatan');
				$('#messageContent').text('Kode AO tidak valid');
				$('#exampleModal').modal('show');
			}else{
				$('#exampleModalLabel').text('Informasi');
				$('#messageContent').text("https://rumahimpian.id/services/onboard?kodeAO="+kodeAO);
				$('#exampleModal').modal('show');
			}
		}else{
			$('#exampleModalLabel').text('Peringatan');
			$('#messageContent').text('Kode AO tidak boleh kosong');
			$('#exampleModal').modal('show');
		}
	}
	
	$(document).ready(function () {
		$('#cmbPersenDP').change(function(){

			var pembiayaan = $('#txtMaksHome').val().split(',').join('');
			if(pembiayaan){
			    pembiayaan = pembiayaan.split(',').join('');
			}else{
				pembiayaan=0;
			}
			var persen = $('#cmbPersenDP').val();
			var dp = (pembiayaan * persen) / 100;
			$('#txtDownPayment').val(formatNumber(dp));
			var max = pembiayaan - dp;
			$('#txtMaxFinance').val(formatNumber(max));
			var harga = $('#txtMaksHome').val().split(',').join('');
			var proyeksiAngsuran = $('#txtProyeksiAngsuran').val().split(',').join('');
			if(proyeksiAngsuran){
				if(harga){
					if(persen){
						Calculate();
					}
				}
			}
			Calculate();
		});
		$('#txtProyeksiAngsuran').change(function(){	
			var persen = $('#cmbPersenDP').val();
			var harga = $('#txtMaksHome').val().split(',').join('');
			var proyeksiAngsuran = $('#txtProyeksiAngsuran').val().split(',').join('');
			if(proyeksiAngsuran){
				if(harga){
					if(persen){
						Calculate();
					}
				}
			}
			Calculate();
		});
		
		$('#txtPendapatan').change(function(){	
			Calculate();
		});
		
		$('#txtMaksHome').change(function(){
			var pembiayaan = $('#txtMaksHome').val().split(',').join('');
			if(pembiayaan){
			    pembiayaan = pembiayaan.split(',').join('');
			}else{
				pembiayaan=0;
			}
			var persen = $('#cmbPersenDP').val();
			var dp = (pembiayaan * persen) / 100;
			$('#txtDownPayment').val(formatNumber(dp));
			var max = pembiayaan - dp;
			$('#txtMaxFinance').val(formatNumber(max));
			var harga = $('#txtMaksHome').val().split(',').join('');
			var proyeksiAngsuran = $('#txtProyeksiAngsuran').val().split(',').join('');
			if(proyeksiAngsuran){
				if(harga){
					if(persen){
						Calculate();
					}
				}
			}
			Calculate();
		});
		
		$("#cmbTenorSimulasi").change(function(){
			var tenor=$('#cmbTenorSimulasi').val();
			var pilih = $("#cmbJenisAngsuranSimulasi").val();
			var input = $("#cmbFiturKhusus").val();
			
			if (input=="Griya SiMuda/Milenial"){
				$("#cmbJenisAngsuranSimulasi").prop('disabled', false);
			}else{

			}
				if (pilih == "Single Price"){
					if (tenor<=120){
						$("#cmbJenisAngsuranSimulasi").prop('disabled', true);
						$("#cmbJenisAngsuranSimulasi").val('Single Price');
						tenor =$('#cmbTenorSimulasi').val();
						
						$("#txtAngsuranSingle").show();
						$("#angs1").hide();
						$("#angs2").hide();
					}else{
						$("#cmbJenisAngsuranSimulasi").prop('disabled', false);	
					}
				}else if (pilih == "2 Step Up"){
					if(tenor<=120){
						$("#cmbJenisAngsuranSimulasi").val('Single Price');
						tenor =$('#cmbTenorSimulasi').val();
						$("#txtAngsuranSingle").show();
						$("#angs1").hide();
						$("#angs2").hide();
						$("#cmbJenisAngsuranSimulasi").prop('disabled', true);	
					}else{
						$('#tenorAkhirStep1').html('Angsuran Step 1 <small>(Bulan ke 1 s/d 60)</small>');
						$('#tenorAkhirStep2').html('Angsuran Step 2 <small>(Bulan ke 61 s/d '+tenor+')</small>');	
						$("#angs2").show();
					}
				}
			
			Calculate();
		});
		
		$("#cmbJenisAngsuranSimulasi").change(function(){
			var pilih = $("#cmbJenisAngsuranSimulasi").val();
			var tenor=$('#cmbTenorSimulasi').val();
			
			if (pilih == "Single Price"){
				$("#txtAngsuranSingle").show();
				$("#angs1").hide();
				$("#angs2").hide();
				$("#cmbStepTiga3").hide();
				$('#txtAngsuranSim').val("");
				$('#txtAngsuranStep1Sim').val("");
				$('#txtAngsuranStep2Sim').val("");
				$('#txtAngsuranStep3Sim').val("");
			} 
			if (pilih == "2 Step Up"){
				$("#txtAngsuranSingle").hide();
				$("#angs1").show();
				$("#angs2").show();
				$("#cmbStepTiga3").hide();
				$('#txtAngsuranSim').val("");
				$('#txtAngsuranStep1Sim').val("");
				$('#txtAngsuranStep2Sim').val("");
				$('#txtAngsuranStep3Sim').val("");
			} 
			
			if (pilih == "6 Step Up"){
					$('#tenorAkhirStep1').html('Angsuran Step 1 <small>(Bulan ke 1 s/d 12)</small>');
					$('#tenorAkhirStep2').html('Angsuran Step 2 <small>(Bulan ke 13 s/d 24)</small>');
					$('#tenorAkhirStep3').html('Angsuran Step 3 <small>(Bulan ke 25 s/d 36)</small>');
					$('#tenorAkhirStep4').html('Angsuran Step 4 <small>(Bulan ke 37 s/d 48)</small>');
					$('#tenorAkhirStep5').html('Angsuran Step 5 <small>(Bulan ke 49 s/d 60)</small>');
					$('#tenorAkhirStep6').html('Angsuran Step 6 <small>(Bulan ke 61 s/d 120)</small>');
			}
			Calculate();
		});
		
		$('#cmbFiturKhusus').change(function(){	
			if ($("#cmbFiturKhusus").val()=="Griya SiMuda/Milenial"){
				$("#cmbTenorSimulasi").empty();
				$('#proyeksiAngsuran').show();
				$('#angs1').show();
				$('#angs2').show();
				$('#angs3').show();
				$('#angs4').show();
				$('#angs5').show();
				$('#angs6').show();
				$('#txtAngsuranSingle').hide();
				for(var i=10;i<=30;i++){
					$("#cmbTenorSimulasi").append('<option value="'+i*12+'">'+i+' Tahun</option>');
				}
				$("#cmbJenisAngsuranSimulasi option[value='Single Price']").remove();
				$("#cmbJenisAngsuranSimulasi option[value='2 Step Up']").remove();
				$("#cmbJenisAngsuranSimulasi option[value='6 Step Up']").remove();
				$("#cmbJenisAngsuranSimulasi").append('<option value="6 Step Up">6 Step Up</option>');
				$('#cmbPersenDP').empty();
				for (var i=0;i<=50; i++){
					$('#cmbPersenDP').append('<option value="'+i+'">'+i+' %</option>'); 
				}
			}else{
				$("#cmbTenorSimulasi").empty();
				$('#proyeksiAngsuran').hide();
				$('#txtAngsuranSingle').show();
				for(var i=5;i<=20;i++){
					$("#cmbTenorSimulasi").append('<option value="'+i*12+'">'+i+' Tahun</option>');
				}
				$("#cmbJenisAngsuranSimulasi option[value='Single Price']").remove();
				$("#cmbJenisAngsuranSimulasi option[value='2 Step Up']").remove();
				$("#cmbJenisAngsuranSimulasi option[value='6 Step Up']").remove();
				$("#cmbJenisAngsuranSimulasi").append('<option value="Single Price">Single Price</option>');
				$("#cmbJenisAngsuranSimulasi").append('<option value="2 Step Up">2 Step Up</option>');
				$('#angs1').hide();
				$('#angs2').hide();
				$('#angs3').hide();
				$('#angs4').hide();
				$('#angs5').hide();
				$('#angs6').hide();
				$("#cmbJenisAngsuranSimulasi").val('Single Price');
				$("#cmbJenisAngsuranSimulasi").prop('disabled', true);
				$('#cmbPersenDP').empty();
				for (var i=5;i<=50; i++){
					$('#cmbPersenDP').append('<option value="'+i+'">'+i+' %</option>'); 
				}
			}
			Calculate();
		});
		
		if ($("#cmbFiturKhusus").val()=="Griya SiMuda/Milenial"){
			$("#cmbTenorSimulasi").empty();
			$("#cmbPersenDP").empty();
			for(var i=10;i<=30;i++){
				$("#cmbTenorSimulasi").append('<option value="'+i*12+'">'+i+' Tahun</option>');
			}
			for (var i=0;i<=50; i++){
				$('#cmbPersenDP').append('<option value="'+i+'">'+i+' %</option>'); 
			}
		}else{
			$("#cmbTenorSimulasi").empty();
			$("#cmbPersenDP").empty();
			for(var i=5;i<=20;i++){
				$("#cmbTenorSimulasi").append('<option value="'+i*12+'">'+i+' Tahun</option>');
			}
			for (var i=5;i<=50; i++){
				$('#cmbPersenDP').append('<option value="'+i+'">'+i+' %</option>'); 
			}
		}
		
	});
	
	function Calculate() {
		var harga = $('#txtMaksHome').val();
		var pendapatan = $('#txtPendapatan').val();
		var proyeksiAngsuran = $('#txtProyeksiAngsuran').val();
		if(harga){
		    harga = harga.split(',').join('');
		}else{
			harga=0;
		}
		if(pendapatan){
		    pendapatan = pendapatan.split(',').join('');
		}else{
			pendapatan=0;
		}
		
		if(harga<=0){
			//$('#exampleModalLabel').text('Peringatan');
			//$('#messageContent').text('Harga Property harus lebih besar dari 0');
			//$('#exampleModal').modal('show');
			return;
		}
		
		if(pendapatan<=0){
			$('#exampleModalLabel').text('Peringatan');
			$('#messageContent').text('Pendapatan per Bulan harus lebih besar dari 0');
			$('#exampleModal').modal('show');
			return;
		}			
		
		var fitur = $("#cmbFiturKhusus").val();
		if(fitur == "Griya SiMuda/Milenial"){
			if(!proyeksiAngsuran){
				$('#exampleModalLabel').text('Peringatan');
				$('#messageContent').text('Mohon isi proyeksi angsuran terlebih dahulu');
				$('#exampleModal').modal('show');
				return;
			}
			
			proyeksiAngsuran = proyeksiAngsuran.split(".").join('');
			if(parseFloat(proyeksiAngsuran)<=0){
				$('#exampleModalLabel').text('Peringatan');
				$('#messageContent').text('Proyeksi angsuran harus lebih besar dari 0');
				$('#exampleModal').modal('show');
				return;
			}
			
			if(proyeksiAngsuran){
				if(pendapatan){
					pendapatan = pendapatan.split(",").join('');
					proyeksiAngsuran = proyeksiAngsuran.split(",").join('');
					if(parseFloat(proyeksiAngsuran)>(0.5*(parseFloat(pendapatan)))){
						$('#exampleModalLabel').text('Peringatan');
						$('#messageContent').text('Nilai pendapatan belum memenuhi syarat, jika anda ingin melanjutkan silahkan tambahkan nilai uang muka dan kurangi nilai proyeksi angsuran');
						$('#exampleModal').modal('show');
						return;		
					}
				}
			}
		}

		var tenor = $('#cmbTenorSimulasi').val();
		var skema = $('#cmbJenisAngsuranSimulasi').val();
		
		
		if(tenor==60){
			if(skema!="Single Price"){
				$('#exampleModalLabel').text('Peringatan');
				$('#messageContent').text('Untuk tenor kurang dari 10 tahun Anda hanya boleh memilih jenis angsuran single price');
				$('#exampleModal').modal('show');
				return;
			}
		}

		$.ajax({
			type : 'POST',
			url : '../services/onboarding/hitungAngsuranTest.controller',
			data : 'pembiayaanDiajukan='+$('#txtMaxFinance').val().split(",").join('')+'&tenor='+$('#cmbTenorSimulasi').val()+'&eventNo=001&kodePekerjaan=11&&skemaPricing='+skema+'&tipeProduk=03&hargaObject='+harga+'&fiturKhusus='+fitur+'&proyeksiAngsuranAwal='+proyeksiAngsuran+'&pendapatan='+$("#txtPendapatan").val(),
			dataType : 'JSON',
			success : function(dto) {
				
				if (dto.errorCode == '05') {
					$('#exampleModalLabel').text('Peringatan');
					$('#messageContent').text("Sepertinya ada sesuatu yang salah, mohon hubungi administrator");
					$('#exampleModal').modal('show');
					return;
				}
				if (dto.errorCode != '00') {
					$('#exampleModalLabel').text('Peringatan');
					$('#messageContent').text(dto.errorMessage);
					$('#exampleModal').modal('show');
					return;
				}
				$('#txtAngsuranSim').val(dto.object.angsuran1);
				$('#txtAngsuranStep1').val(dto.object.angsuran1);
				$('#txtAngsuranStep2').val(dto.object.angsuran2);
				$('#txtAngsuranStep3').val(dto.object.angsuran3);
				$('#txtAngsuranStep4').val(dto.object.angsuran4);
				$('#txtAngsuranStep5').val(dto.object.angsuran5);
				$('#txtAngsuranStep6').val(dto.object.angsuran6);
				
				var persenDPExisting = $('#cmbPersenDP').val();
				if(parseFloat(persenDPExisting)<parseFloat(dto.object.persenDPBaru)){
					$('#cmbPersenDP').empty();
					var optionValue = dto.object.persenDPBaru; 
					
					for (var i=0;i<=50; i++){
						$('#cmbPersenDP').append('<option value="'+i+'">'+i+' %</option>'); 
					}
					$("#cmbPersenDP option[value='"+optionValue+"']").remove();
					$("#cmbPersenDP").append('<option value="'+optionValue+'">'+optionValue+' %</option>');	
					$("#cmbPersenDP").val(optionValue);
					var hargaObject = $('#txtMaksHome').val();
					hargaObject = hargaObject.split(",").join('');
					var uangMukaBaru = optionValue*parseFloat(hargaObject)/100;
					var maxFinanceBaru = parseFloat(hargaObject) - uangMukaBaru;

					 $('#txtMaxFinance').val(formatNumber(maxFinanceBaru));
					 $('#txtDownPayment').val(formatNumber(uangMukaBaru));
				}
				if(parseFloat(dto.object.angsuran1.split(',').join(''))>(0.5*(parseFloat(pendapatan)))){
					$('#exampleModalLabel').text('Informasi');
					$('#messageContent').text('Nilai pendapatan Anda masih belum memenuhi persyaratan untuk pengajuan pembiayaan, silahkan ubah tenor untuk menyesuaikan angsuran');
					$('#exampleModal').modal('show');
					return;		
				}		
			},
			fail : function() {
			}
		});
	}
	
	function formatNumber(x) {
	    x = x.toString();
	    var pattern = /(-?\d+)(\d{3})/;
	    while (pattern.test(x))
	        x = x.replace(pattern, "$1,$2");
	    return x;
	}
	
	function ajukan(){
		var param = 'hargaRumah='+$("#txtMaksHome").val()+'&persenDP='+$("#cmbPersenDP").val()+'&downPayment='+$("#txtDownPayment").val()+'&maxFinance='+$("#txtMaxFinance").val()+'&tenorSimulasi='+$("#cmbTenorSimulasi").val()+'&angsuranSim='+$("#txtAngsuranStep1").val()+'&angsuranSim2='+$("#txtAngsuranStep2").val()+'&angsuranSim3='+$("#txtAngsuranStep3").val()+'&angsuranSim4='+$("#txtAngsuranStep4").val()+'&angsuranSim5='+$("#txtAngsuranStep5").val()+'&angsuranSim6='+$("#txtAngsuranStep6").val()+'&proyeksi='+$("#txtProyeksiAngsuran").val()+'&pendapatan='+$("#txtPendapatan").val()+'&fitur='+$("#cmbFiturKhusus").val()+'&skemaPricing='+$("#cmbJenisAngsuranSimulasi").val();
		$.ajax({
			type : 'POST',
			url : '../services/onboarding/simulasi.controller?',
			data : param,
			dataType : 'JSON',
			success : function(dto) {
				document.location='/services/onboard/index.jsp';
			}
		});
	//}
		//window.location.assign('https://rumahimpian.id/services/onboard/index2.jsp?hargaRumah='+$("#txtMaksHome").val()+'&persenDP='+$("#cmbPersenDP").val()+'&downPayment='+$("#txtDownPayment").val()+'&maxFinance='+$("#txtMaxFinance").val()+'&tenorSimulasi='+$("#cmbTenorSimulasi").val()+'&angsuranSim='+$("#txtAngsuranStep1").val())
		/*  var surl = 'https://rumahimpian.id/services/onboard/index2.jsp?hargaRumah='+$("#txtMaksHome").val()+'&persenDP='+$("#cmbPersenDP").val()+'&downPayment='+$("#txtDownPayment").val()+'&maxFinance='+$("#txtMaxFinance").val()+'&tenorSimulasi='+$("#cmbTenorSimulasi").val()+'&angsuranSim='+$("#txtAngsuranStep1").val()+'&angsuranSim2='+$("#txtAngsuranStep2").val()+'&angsuranSim3='+$("#txtAngsuranStep3").val()+'&angsuranSim4='+$("#txtAngsuranStep4").val()+'&angsuranSim5='+$("#txtAngsuranStep5").val()+'&angsuranSim6='+$("#txtAngsuranStep6").val()+'&proyeksi='+$("#txtProyeksiAngsuran").val();
		$("#frmSimulasi").attr("action", surl);
		document.getElementById("frmSimulasi").submit();  */

		//document.location='https://rumahimpian.id/services/onboard/index2.jsp?hargaRumah='+$("#txtMaksHome").val()+'&persenDP='+$("#cmbPersenDP").val()+'&downPayment='+$("#txtDownPayment").val()+'&maxFinance='+$("#txtMaxFinance").val()+'&tenorSimulasi='+$("#cmbTenorSimulasi").val()+'&angsuranSim='+$("#txtAngsuranStep1").val();
	}
	
	function katalog(){
		let a= document.createElement('a');
		a.target= '_blank';
		a.href= 'https://www.lamudi.co.id/banksyariahindonesia/?agent_sub_menu_enabled=1';
		a.click();
	}
	
	
