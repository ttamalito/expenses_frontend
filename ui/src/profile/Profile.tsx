import React from 'react';

interface IProfileProps {
    username: string;
}

export default function Profile({ username }: IProfileProps) {

    const sidePanel = <div>Side Panel</div>;
    const mainContent = <div>Main Content</div>;
    const footer = <div>Footer</div>;
    const header = <div>Header</div>;


    return (
        <div>
            {header}
            <div>
                {sidePanel}
                {mainContent}
            </div>
            {footer}

        </div>
    );

}