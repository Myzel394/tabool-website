/* "{
"data": {
    "type": "detail:modification",
        "payload": "{\"id\":\"fuSVpIb\"}"
},
"from": "82990205406",
    "priority": "high",
    "notification": {
    "title": "Veränderungen am 25.01.2021 in Mathe!",
        "body": "Es gibt Veränderungen in Mathe!\n\nFach: Mathe -> Deutsch\nRaum: 118 -> 205"
},
"collapse_key": "modification_fuSVpIb"
}"
    */

export type AvailablePriorities = "normal" | "high";

export interface FCMNotification {
    collapseKey: string;
    from: string;
    priority: AvailablePriorities;
    notification: {
        title: string;
        body: string;
    };
    data?: {
        type: string;
        payload: any;
    } | any;
}
