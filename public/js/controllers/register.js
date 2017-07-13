function Register(){
    //能否进行保存
    this.canNext = 0;
    //手机号
    this.usermobile = '';
    //密码
    this.userpassword ='';
    //密码是否可视
    this.cansee = 1;
    //条形码的验证
    //this.codeVer = 0;
    //确认密码是否可视
    this.canseeagian = 1;
    //公司名称
    this.companyname = '';

}

//初始化方法
Register.prototype.init = function(){
    var height = window.screen.height-64;
    $('#container').css("height",height+'px');

}
//返回按钮
Register.prototype.noRegister = function(){
    location.href = '/userloginhtml';
}
//条形验证码的取消和X
Register.prototype.codeCancel = function(){
    $('.modal').hide();

}
//modal的出现
Register.prototype.showModal = function(){
    $('.modal').show();

}
//条形验证码的确定
Register.prototype.codeOk = function(){
    var $this =this;
    var phoneReg = /^1[3|5|7|8|9]\d{9}$/;
    this.usermobile = $('#usermobile').val();
    var verify_code = $('#photoCode').val();
    var token = $('#token').val();
    
    var url = '/sendsms';
    var params = {
        _token:token,
        captcha:verify_code,
        usermobile:$this.usermobile
        
    };
    //alert(JSON.stringify(params));
    if(!phoneReg.test($this.usermobile)) {
        layer.alert('请输入正确的手机号', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(verify_code == ''){
        layer.alert('图形验证码不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else{
        $.post(url,params,function(data, status) {
            if (data == 'fail') {
                layer.alert('短信发送失败，请重新发送');
            }else if(data == 'codefail'){
                layer.alert('图形验证码错误');
            }else{
                $('.modal').hide();
                $this.getCode();
            }
        })
    }





}
//使用定时器刷新验证码的秒数
Register.prototype.getCode = function() {
    var wait = 60;
    var $this = this;
    var getData = function () {
        if (wait == 0) {
            $('#getCode').attr("disabled", false);
            $('#getCode').html('获取验证码');
            wait = 60;
        } else {
            $('#getCode').attr("disabled", true);
            $('#getCode').html(wait + "秒后,重新获取");
            wait--;
            setTimeout(function (){
                getData()
            }, 1000)
        }
    };
    getData();
};


//密码是否可视
Register.prototype.canSeePassword = function(item){
    if(item ==1){
        if(this.cansee){
            $('#userpassword').hide();
            $('#userpassword1').show();
            $('#userpassword1').val($('#userpassword').val());
            $('.pwd-see').attr('src','/images/cansee-set.png');
            this.cansee = 0;
        }else{
            $('#userpassword1').hide();
            $('#userpassword').show();
            $('#userpassword').val($('#userpassword1').val());
            $('.pwd-see').attr('src','/images/cansee.png');
            this.cansee = 1;
        }
    }else{
        if(this.canseeagian){
            $('#userpasswordonce').hide();
            $('#userpasswordonce1').show();
            $('#userpasswordonce1').val($('#userpasswordonce').val());
            $('.pwd-see1').attr('src','/images/cansee-set.png');
            this.canseeagian = 0;
        }else{
            $('#userpasswordonce1').hide();
            $('#userpasswordonce').show();
            $('#userpasswordonce').val($('#userpasswordonce1').val());
            $('.pwd-see1').attr('src','/images/cansee.png');
            this.canseeagian = 1;
        }
    }

}

//更换手机和密码图标
Register.prototype.replaceIcon = function(){
    var companynameval = $('#usercompany').val().replace(/\s/,'');
    var usermobileval = $('#usermobile').val().replace(/\s/,'');
    var code = $('#code').val().replace(/\s/,'');
    var userpasswordval = $('#userpassword').val().replace(/\s/,'');
    var userpasswordonce = $('#userpasswordonce').val().replace(/\s/,'');
    if(companynameval !=''){
        $('.userCom img').attr('src','/images/app-company-set.png');
    }else{
        $('.userCom img').attr('src','/images/app-company.png');
    }
    if(usermobileval !=''){
        $('.userName img').attr('src','/images/usermobile-set.png');
    }else{
        $('.userName img').attr('src','/images/usermobile.png');
    }
    if(code !=''){
        $('.code-icon').attr('src','/images/ver-set.png');
    }else{
        $('.code-icon').attr('src','/images/ver.png');
    }
    if(userpasswordval !=''){
        $('.pwd-icon').attr('src','/images/password-set.png');
    }else{
        $('.pwd-icon').attr('src','/images/password.png');
    }
    if(userpasswordonce !=''){
        $('.pwd-icon1').attr('src','/images/password-set.png');
    }else{
        $('.pwd-icon1').attr('src','/images/password.png');
    }
}

//手机号的验证
Register.prototype.verification = function(){
    var $this = this;
    var phoneReg = /^1[3|5|7|8|9]\d{9}$/;
    this.companyname = $('#usercompany').val().replace(/\s/g,'');
    this.usermobile = $('#usermobile').val().replace(/\s/g,'');
    this.userpassword = $('#userpassword').val().replace(/\s/g,'');
    var pwdVal1 = $('#userpasswordonce').val().replace(/\s/g,'');
    var pwdValLength = $('#userpassword').val().length;
    var code = $('#code').val().replace(/\s/g,'');
    if(this.companyname == ''){
        layer.alert('公司名称不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(!phoneReg.test($this.usermobile)) {
        layer.alert('请输入正确的手机号', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(code== ''){
        layer.alert('验证码不能为空', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if(pwdValLength<6){
        layer.alert('密码最少为6位', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else if($this.userpassword != pwdVal1){
        layer.alert('请输入相同的密码', {
            icon: 6,
            layer: 'layer-ext-moon'
        });
    }else{
        this.canNext = 1;
    }
    if(this.canNext){
        $this.register();
    }
}
//注册入口
Register.prototype.register = function(){
    this.canNext = 0;
    var $this = this;
    var companyName = $('#companyName').val();
    var url = './register' ;
    var params = {
        _token:$('#token').val(),
        companyname:$this.companyname,
        usermobile:$this.usermobile,
        userpassword : $this.userpassword,
        code:$("#code").val()

    };
    $.post(url,params,function(msg){
        console.log(msg);
        if(msg && msg == 'exist'){
            layer.alert('手机号已存在，请登录', {
                icon: 6,
                layer: 'layer-ext-moon'
            },function(){
                location.href = 'userloginhtml';
            });
        }else if(msg == 'success'){
            layer.alert('注册成功，请登录', {
                icon: 6,
                layer: 'layer-ext-moon'
            },function(){
                location.href = 'userloginhtml';
            });
        }else if(msg == 'smscodeerror'){
            layer.alert('手机短信验证码错误', {
                icon: 6,
                layer: 'layer-ext-moon'
            });
        }else{
            layer.alert('注册失败，请重新注册', {
                icon: 6,
                layer: 'layer-ext-moon'
            },function(){
                location.href = 'registerhtml';
            });
        }
    });

}

var  $Register = new Register();