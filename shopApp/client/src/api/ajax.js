import axios from 'axios'

export default function ajax(url='',data={},type='GET'){
    return new Promise((resolve,reject) => {
        let promise;
        //拼接请求参数的字符串
        if(type === 'GET'){
            let str = '';
            Object.keys(data).forEach(key => {
                str += key + '=' + data[key] + '&';
            })
            if(str !== ''){
                str = str.substring(0,str.lastIndexOf('&'));
                url = url + '?' + str;
            }
            promise = axios.get(url);
        }else{
            // post请求
            promise = axios.post(url,data);
        }

        promise.then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        })
    })
   
}
