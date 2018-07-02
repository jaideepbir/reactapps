import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

class Course extends Component {
    
    render () {
        let id = Number(this.props.match.params.Course);
        let course = this.props.courses[id-1];
        console.log('Course Render', course);

        return ( course ? <div className='Course'>
                <h1>{course.title}</h1>
                <p>You selected the Course with ID: {course.id}</p>
            </div> : <div>
                    <h1>404</h1>
                <p>Not Found!</p>
                </div>
        );
    }
}

export default Course;
// export default withRouter(Course);