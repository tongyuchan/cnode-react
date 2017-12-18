/*
* 日期转换
* @param date {Date} 日期
* */
export const transforDate=(date)=>{
    const createAt=new Date(date);
    const time=new Date().getTime()-createAt.getTime();
    if(time<0){
        return ''
    }else if(time/1000<60){
        return '刚刚'
    }else if(time/60000<60){
        return `${parseInt(time/60000)}分钟前`
    }else if(time/3600000<60){
        return `${parseInt(time/3600000)}小时前`
    }else if((time/86400000)<31){
        return `${parseInt(time/86400000)}天前`
    }else if((time/2592000000)<12){
        return `${parseInt(time/2592000000)}月前`
    }else{
        return `${parseInt(time/31536000000)}年前`
    }
};