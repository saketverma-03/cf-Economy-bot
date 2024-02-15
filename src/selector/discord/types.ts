export interface GuildDetails {
    id: string;
    name: string;
    icon: string;
    description: any;
    splash: string;
    discovery_splash: any;
    approximate_member_count: number;
    approximate_presence_count: number;
    features: string[];
    emojis?: Emoji[];
    banner: string;
    owner_id: string;
    application_id: any;
    region: any;
    afk_channel_id: any;
    afk_timeout: number;
    system_channel_id: any;
    widget_enabled: boolean;
    widget_channel_id: string;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences: any;
    max_members: number;
    max_video_channel_users: number;
    vanity_url_code: string;
    premium_tier: number;
    premium_subscription_count: number;
    system_channel_flags: number;
    preferred_locale: string;
    rules_channel_id: any;
    public_updates_channel_id: any;
    safety_alerts_channel_id: any;
}

export interface Emoji {
    name: string;
    roles: any[];
    id: string;
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
}

export interface Role {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color?: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
}

export interface GuilldMember {
    user: User;
    nick: string;
    avatar?: string;
    roles: Role[];
    joined_at: string;
    deaf: boolean;
    mute: boolean;
}

export interface User {}
