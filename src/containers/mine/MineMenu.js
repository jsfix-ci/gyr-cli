import React, { Component } from 'react'
import cx from 'classnames'
import styles from '@/stylus/mine/menu'
export default class extends Component {
  constructor () {
    super()
    this.state = {
      menu: [
        {
          name: '消息提醒',
          icon: 'message',
          mark: true
        },
        {
          name: '我的收藏',
          icon: 'collect'
        },
        {
          name: '我的帖子',
          icon: 'topic'
        },
        {
          name: '我的评论',
          icon: 'comment'
        },
        {
          name: '我的任务',
          icon: 'task',
          mark: true
        }
      ]
    }
  }
  render () {
    const { menu } = this.state
    return (
      <div className={cx(styles.menu)}>
        {
          menu.map(function (item, index) {
            return (
              <div key={'mine-menu-' + index} className={styles.item}>
                <span className={cx(styles['icon'], styles[item.icon])}></span>
                <span className={styles['menu-name']}>{item.name}</span>
                { item.mark && <span className={styles['mark']}></span> }
                <span className={styles['arrows']}></span>
              </div>
            )
          })
        }
      </div>
    )
  }
}
