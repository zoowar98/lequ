new Vue({
	el:".main",
	data:{
		userList:[],
		isShow:false
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getUser();
		})
	},
	methods:{
		
		getUser:function(){
			var vm=this;
			// 添加请求拦截器
            axios.interceptors.request.use((config)=>{
                // 在发送请求之前做些什么
                console.log(config);
                vm.isShow = true;
                return config;
            }, function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            });
            // 添加响应拦截器
            axios.interceptors.response.use((response)=> {
                // 对响应数据做点什么
                console.log(response);
                vm.isShow = false;
                return response;
            }, function (error) {
                // 对响应错误做点什么
                return Promise.reject(error);
            });            
			axios.get("https://api.github.com/users").then(function(res){
				vm.userList=res.data;
			})
		}
	}
})