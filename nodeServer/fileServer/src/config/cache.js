module.exports = {
    cacheControl: true, // 控制相对过期时间
    expires: true, // 控制绝对过期时间
    etag: true, // 控制文件内容的唯一标识符
    lastModified: true, // 控制文件的上次修改时间
    maxAge: 10, // 相对过期时间 10秒
    expiresTime: 1 * 60 * 1000 // 绝对过期时间 1分钟
}
