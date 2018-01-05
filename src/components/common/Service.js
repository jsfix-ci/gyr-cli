/**
 * 客服
 */
import React, { Component } from 'react'
import wlb from '@/util/webview'
import native from '@/util/native'
export default class extends Component {
  toJumpService () {
    // wlb.ready({
    //   app: function (mixins) {
    //     mixins.jumpToOnLineAirlines()
    //   }
    // })
    native.ready(() => {
      var shareMessage = {
        content: '分享的内容',
        title: '分享的标题',
        thumbs: '',
        href: 'http://www.bao-ru.com:3001'
      }
      // 分享
      plus.share.sendWithSystem(shareMessage, () => {
        alert('分享成功')
      })
      // 照相
      // var camera = plus.camera.getCamera()
      // camera.captureImage((file) => {
      //   alert(file)
      // }, () => {
      //   alert('error')
      // })

      // alert(JSON.stringify(camera))
    })
  }
  render () {
    const { className } = this.props
    return (
      <div onClick={this.toJumpService.bind(this)} className={className} style={styles.icon}>
      </div>
    )
  }
 }
const styles = {
  icon: {
    width: '1.4rem',
    height: '1.4rem',
    background: 'url(\'' + require('@/imgs/bt_sq_kf@2x.png') + '\') center / 1.4rem 1.4rem no-repeat'
  }
}
