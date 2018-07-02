import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Course from '../Course/Course';
import Aux from '../../Aux/Aux';
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ],
        showCourses: false
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.match.isExact === true && !prevProps.match.isExact){
            this.setState({showCourses: true})
            
        }
        console.log('Selected', 'This.Props:', this.props.match.isExact, 'prevProps:', prevProps.match.isExact)
    }

    componentDidMount(){
        if (this.props.match.isExact){
            this.setState({showCourses: true})
            console.log('Courses DM', this.props.match)
            
        }
    } 

    hideCoursesHandler(){
        if (this.state){
            this.setState({showCourses: false})
        }
    }

    courseSelectedHandler(id) {
        // this.hideCoursesHandler();
        let displayCourses = this.state.showCourses
        this.setState({showCourses: !displayCourses})
        console.log('SelectionHandled', this.props.match.url)
        this.props.history.push({pathname: this.props.match.url+'/'+id});
    }


    render () {
        let courses = {...this.state.courses}
        // let showFullCourse = () => {
        //     return <Course courses ={courses}/>
            
        // }

        const showCourseList = 
            <div> 
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {console.log('Courses Render: Show Courses:', this.state.showCourses)}
                        {   
                            this.state.courses.map( course => {
                                {/* console.log('Courses Render - ShowCourses:', this.state.showCourses) */}
                                return (
                                    <Aux key={course.id}>
                                            <article 
                                                    key={course.id}
                                                    onClick={() => this.courseSelectedHandler(course.id)}
                                                    match={this.props.match}>
                                                        <p><strong>{course.title}</strong></p>
                                            </article>
                                    </Aux>
                                    
                                            // <article className="Courses" key={course.id}> 
                                                    // <Link 
                                                      //  to= {this.props.match.url+"/"+course.id}
                                                      //  course={course}
                                                      //  onClick={() => this.courseSelectedHandler(course.id)}>
                                                      //  <p>{course.title}</p>
                                                      //  {course.title}
                                                    // </Link> */}
                                            // </article> */}
                                    
                                    
                                )
                            } )
                        }
                </section>
            </div>;

        return (
            <div>
                {this.state.showCourses ? showCourseList : null}
                {/* {!this.state.showCourses ? showFullCourse : null } */}
                <Route path={this.props.match.url+'/:Course'} exact render={(match) => <Course courses ={courses} {...match}/>} />
                {/* <Route path={this.props.match.url+'/:Course'} exact component={Course} {...this.state} /> */}
            </div>
        );
    }
}

export default Courses;