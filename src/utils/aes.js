// 对称加密，加密解密相同密钥, 因为不加密会明文传输账号密码不安全
import CryptoJS from "crypto-js"; //parse解析
// 密钥十六位十六进制（用于控制加密过程中的转换操作）//根后端规定好的
const key = CryptoJS.enc.Utf8.parse("AOWQ4P0YEC4YXUKS");
// 密钥偏移量（用于确保即使相同的明文被加密多次，每个加密结果也是不同的，密钥偏移量可以增强加密的安全性并减少被攻击的可能性。）
// 确保了每个加密结果都是唯一的 因为如果使用相同明文使用相同密钥多次加密，就可以根据加密结果破解密钥
const iv = CryptoJS.enc.Utf8.parse('O3V2GCL1K2HNZ9Y7')

// 解密方法
function Decrypt(word) {
    //返回的是解密后的对象
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //将解密对象转换成UTF8的字符串
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    //返回解密结果
    return decryptedStr.toString();
}

// 加密方法
function Encrypt(word) {
    //CipherOption,加密的一些选项：
    //mode:加密模式，可取值（CBC,CFB,CTR,CTRGladman,OFB,ECB),都在CryptoJS.mode对象下
    //padding:填充方式，可取值（Pkcs7,Ansix923,Iso10126,ZeroPadding,NoPadding),都在CryptoJS.pad对象下
    //iv:偏移量，mode===ECB时，不需要iv
    //返回的是一个加密对象
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return encrypted.ciphertext.toString().toUpperCase();
    //将结果进行base64加密
    // return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
export { Decrypt, Encrypt }