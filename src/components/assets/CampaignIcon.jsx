import React from 'react';

const CampaignIcon = ({ type }) => {
    if (type === "Event") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 24 23">
                <g fill="none" fillRule="evenodd">
                    <g fill="#5B08A4">
                        <g>
                            <path d="M18.766 42.953l-6.76-4.569-6.72 4.569-1.053-.752 2.401-7.644L0 29.805l.421-1.187 8.288-.163 2.643-7.502h1.327l2.717 7.543 8.193.122.411 1.208-6.603 4.832 2.433 7.564-1.064.73zM2.454 29.907l4.991 3.655c.443.318.633.87.474 1.38L6.097 40.73l5.15-3.451c.456-.306 1.06-.306 1.516 0l5.15 3.451-1.822-5.787c-.158-.51.031-1.062.474-1.38l4.992-3.655-6.319-.122c-.519-.05-.96-.387-1.127-.863l-2.106-5.716L9.9 28.922c-.18.506-.667.85-1.222.863l-6.223.122z" transform="translate(-16 -353) translate(16 333)" />
                        </g>
                    </g>
                </g>
            </svg>
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 25">
                <g fill="none" fillRule="evenodd">
                    <g fill="#5B08A4">
                        <g>
                            <g>
                                <g>
                                    <path d="M7.286 0h15.999v18.581h-6.856v4.13h-16V4.128h6.857V0zm9.143 4.13v13.078h5.337V1.372h-10.92l5.583 2.757zm-7.623-.081v.08h4.453l-4.453-2.2v2.12zM1.949 5.502v15.834h12.96V5.502H1.949zm1.908 4.129V8.258H13v1.373H3.857zm0 3.097v-1.373H13v1.373H3.857zm0 3.097v-1.373h6.857v1.373H3.857z" transform="translate(-15 -153) translate(15 133) translate(0 20.686) translate(.571 .258)" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}

export default CampaignIcon;