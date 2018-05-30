/**
 * 数组模拟堆栈
 */

// 栈窗口
var dialogStack = []

// 进堆
function intoStack(stackId) {
    dialogStack.push(stackId)
}

// 出堆
function outStack(stackId) {
    if (dialogStack.length > 0) {
        if (stackId) {
            var currentStackId = dialogStack[dialogStack.length - 1]
            if (currentStackId == stackId) {
                removeAllStackId(stackId)
                console.log('all dialogStack', dialogStack)
                return
            }
        } else {
            var delStack = dialogStack.pop()
            console.log('delStack', delStack)
            return
        }
    }
}

function removeAllStackId(stackId) {
    var newDialogStack = []
    for (var i = 0; i < dialogStack.length; i++) {
        var currentStackId = dialogStack[i]
        if (currentStackId !== stackId) {
            newDialogStack.push(currentStackId)
        }
    }
    dialogStack = newDialogStack
}

// 测试
intoStack('a')
intoStack('b')
intoStack('c')
intoStack('d')
intoStack('e')
intoStack('c')
intoStack('d')
intoStack('e')

// 依次删除
// while (dialogStack.length > 0) {
//     outStack()
// }

// 批量删除
while (dialogStack.length > 0) {
    outStack(dialogStack[dialogStack.length - 1])
}
