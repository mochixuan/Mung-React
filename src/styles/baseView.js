import React from 'react'
import ReactLoading from 'react-loading'


export const renderScrollIndicator = (themeColor) => {
    const scrollIndicatorStyles = {
        display: 'flex',
        height: '48px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        fontSize: '14px',
        color: themeColor
    }
    return {
        finish: <div style={scrollIndicatorStyles}>刷新完成</div>,
        release: (
            <div style={scrollIndicatorStyles}>
                <ReactLoading
                    type={'bars'}
                    color={themeColor}
                    width={'36px'}
                    height={'36px'}
                />&nbsp;&nbsp;拼命加载中
            </div>
        ),
        deactivate: <div style={scrollIndicatorStyles}>上拉进行刷新</div>,
        activate: <div style={scrollIndicatorStyles}>松开小手就可以刷新啦!</div>
    }
}

export const renderCommonIndicator = (themeColor,isLarge) => {
    const scrollIndicatorStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: isLarge ? '80px' : '60px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: isLarge ? '20px' :'14px',
        color: themeColor,
        width: '100%',
    }
    return (
        <div style={scrollIndicatorStyles}>
            <ReactLoading
                type={'bars'}
                color={themeColor}
                width={isLarge ? '64px' : '32px'}
                height={isLarge ? '64px' : '32px'}
            />&nbsp;&nbsp;加载中
        </div>
    )
}

export const renderReloadingView = (themeColor,isLarge,onPress) => {
    const scrollIndicatorStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: isLarge ? '80px' : '60px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: isLarge ? '20px' :'14px',
        color: themeColor,
        width: '100%',
        fontWeight: '300',
        marginTop: '4px',
    }
    const iconStyle = {
        fontSize: isLarge ? '64px' : '32px'
    }
    return (
        <div style={scrollIndicatorStyles} onClick={onPress}>
            <i className={'iconfont'} style={iconStyle}>&#58937;</i>
            <span>点击重新加载</span>
        </div>
    )
}
