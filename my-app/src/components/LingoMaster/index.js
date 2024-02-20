import {Component} from 'react'
import Header from '../Header'
import Body from '../Body'
import 'typeface-roboto';
import './index.css'

class LingoMaster extends Component {

    render () {

        return(
            <div className='bg-container'>
                <Header />
                <div className='text-container'>
                    <h1 className='main-heading'>Welcome to Lingo Master!!!</h1>
                    <p className='description'>Your docs summarized in language of your choice</p>
                </div>
                <Body />
            </div>
        )
    }
}

export default LingoMaster