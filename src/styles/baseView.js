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
