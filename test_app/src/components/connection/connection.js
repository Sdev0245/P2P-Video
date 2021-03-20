import classes from './connection.module.css';

const Connection = (props)=>{

    return (
        <div className={classes.SingleUser} key={props.element.id}>
             
                <li >
                    <a>
                        {props.element.id}
                    </a>
                </li>
            
            {props.children}
     </div>
    )
}

export default Connection