import classes from './connection.module.css';

const Connection = (props)=>{

    return (
        <div className={classes.SingleUser} key={props.element.id} onClick={props.click}>
             
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