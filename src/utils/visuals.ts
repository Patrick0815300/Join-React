export const getPriorityIcon = (priority: string) => {
    switch (priority) {
        case 'Urgent':
            return <Urgent className={ styles.urgentIcon } />;
        case 'Medium':
            return <span className={ styles.mediumIcon }>= </span>;
        case 'Low':
            return <Urgent className={ styles.lowIcon } />;
        default:
            return null;
    }
};