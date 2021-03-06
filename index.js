const mask = document.createElement('div')
mask.style = 'position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: #000e;z-index: 99999;color: #fff;padding: 20px;font-size: 12px;overflow-y: auto;'
document.body.append(mask)

function htmlLog(str) {
    console.log(str)
    mask.innerHTML = `${str}<br>` + mask.innerHTML
}

//bilibili兑换码提取
//https://www.bilibili.com/
//https://api.live.bilibili.com/lottery/v1/Award/award_list?page=1&month=202109
let bilibili = () => {
    let mapFunction = a => a.create_time + ' ' + a.gift_value
    fetch('https://api.live.bilibili.com/lottery/v1/Award/award_list?page=1&month=202109', {
        mode: 'cors',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(json => json.data.list.map(mapFunction).forEach(a => htmlLog(a)))
}


//虎牙兑换码提取
//https://www.huya.com/
//https://activity.huya.com/commonprize/index.php?m=UserApi&do=getUserPrizes&moduleId=4005
let huya = () => {
    let mapFunction = a => new Date(a.time * 1000) + ' ' + a.virtualNumber
    jQuery.ajax({
        type: "get",
        async: false,
        url: "https://activity.huya.com/commonprize/index.php?m=UserApi&do=getUserPrizes&moduleId=4005",
        dataType: "jsonp", //jsonp跨域
        success: data => data.data.map(mapFunction).forEach(a => htmlLog(a)),
        error: () => alert('fail')
    })
}


//douyu兑换码提取
//https://www.douyu.com
//https://www.douyu.com/japi/carnival/nc/giftbag/myrecord?pageSize=20&currentPage=1&actAlias=20210825ZSKZX
let douyu = () => {
    let mapFunction = a => new Date(a.prizes[0].obtTime * 1000) + " " + a.prizes[0].ext
    fetch('https://www.douyu.com/japi/carnival/nc/giftbag/myrecord?pageSize=20&currentPage=1&actAlias=20210825ZSKZX', {
        mode: 'cors',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(json => json.data.bags.map(mapFunction).forEach(a => htmlLog(a)))
}

let domain = document.domain
if (domain.includes('bilibili')) {
    bilibili()
} else if (domain.includes('huya')) {
    huya()
} else if (domain.includes('douyu')) {
    douyu()
}
