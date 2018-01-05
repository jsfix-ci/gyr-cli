import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import styles from '@/stylus/topic.item'

import TopicTag from '@/components/common/TopicTag'

import { AddThreadCollect, DelThreadCollect, AddThreadZan, DelThreadZan } from '@/util/api'
class TopicItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collected: false,
      loved: false
    }
    const { topicList } = this.props
    this.topicList = {...topicList}
    // console.log(this.topicList, this.props)
  }
  // 收藏
  toStart (id, index) {
    const { selectedNavbarIndex, topicTypes, selectedTabs } = this.props
    const typeid = topicTypes[selectedNavbarIndex].id
    const tabIndex = selectedTabs[selectedNavbarIndex]
    var el = this.refs.start
    if (this.props['collection'] || this.state.collected) {
      DelThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: false
          })
          this.topicList[typeid][tabIndex][index].collection_num -= 1
          this.topicList[typeid][tabIndex][index].collection = null
          setTimeout(() => {
            this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
          }, 0)
        }
      })
    } else {
      AddThreadCollect(id).then(res => {
        if (res.result) {
          this.setState({
            collected: true
          })
          $.tipsBox({
            obj: $(el),
            str: '+1',
            color: '#008DFF'
          })
          this.topicList[typeid][tabIndex][index].collection_num += 1
          this.topicList[typeid][tabIndex][index].collection = res.result.data
          this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
      })
    }
  }
  // 点赞
  toLove (id, index) {
    const { selectedNavbarIndex, topicTypes, selectedTabs } = this.props
    const typeid = topicTypes[selectedNavbarIndex].id
    const tabIndex = selectedTabs[selectedNavbarIndex]
    var el = this.refs.love
    console.log(this.props.zan)
    if (this.props['zan'] || this.state.loved) {
      this.Toast.show('您已经点过赞了～')
      // DelThreadZan(id).then(res => {
      //   if (res.result) {
      //     this.setState({
      //       loved: false
      //     })
      //     this.topicList[typeid][tabIndex][index].zan_num -= 1
      //     this.topicList[typeid][tabIndex][index].zan = null
      //     this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
      //   }
      // })
    } else {
      AddThreadZan(id).then(res => {
        if (res.result) {
          this.setState({
            loved: true
          })
          $.tipsBox({
            obj: $(el),
            str: '+1',
            color: '#E83C25'
          })
          this.topicList[typeid][tabIndex][index].zan_num += 1
          this.topicList[typeid][tabIndex][index].zan = res.result.data
          this.props.dispatch({type: 'change home topic list data', topicList: {...this.topicList}})
        }
        if (res.error) {
          this.Toast.show(res.error.message)
        }
      })
    }
  }
  render () {
    const { className, title, user, history, index } = this.props
    var collected = this.state.collected
    var loved = this.state.loved
    return (
      <div className={styles['topic-item'] + ' ' + className}>
        <div className={styles['header']}>
          <img src={user ? user['head_img'] : ''} className={styles['avatar']} />
          <div className={styles['header-right']} onClick={() => history.push({pathname: '/topic/detail/' + this.props.id, state: index})}>
            <div className={styles['header-right-first-fl']}>
              <span className={styles['nickname']} style={{marginRight: '18px'}}>{user ? user.nickname : ''}</span>
              { this.props['isofficial'] === 1 && <TopicTag type="official" style={{marginRight: '18px'}}/> }
              { this.props['ishot'] === 1 && <TopicTag type="hot" style={{marginRight: '18px'}}/> }
              { this.props['isgreat'] === 1 && <TopicTag type="essence" /> }
            </div>
            <div className={styles['header-right-second-fl']}>
              <span>{this.props['created_at']}</span>
              <span className={styles['separated']}>·</span>
              <span>{this.props['views']}人阅读</span>
            </div>
          </div>
        </div>
        <div onClick={() => history.push({pathname: '/topic/detail/' + this.props.id, state: index})} className={styles['content']}>
          <p>{title}</p>
        </div>
        <div className={styles['footer']}>
          <div className={cx({[styles['start']]: !collected, [styles['started']]: this.props['collection'] || collected})} ref="start" onClick={this.toStart.bind(this, this.props.id, index)}><span>{this.props['collection_num']}</span></div>
          <div className={styles['comment']}><span onClick={() => history.push({pathname: '/topic/detail/' + this.props.id, state: index, hash: 'comment'})}>{this.props['comment_num']}</span></div>
          <div className={cx({[styles['love']]: !loved, [styles['loved']]: this.props['zan'] || loved})} ref="love" onClick={this.toLove.bind(this, this.props.id, index)}><span>{this.props['zan_num']}</span></div>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(({topic}) => topic)(TopicItem))
