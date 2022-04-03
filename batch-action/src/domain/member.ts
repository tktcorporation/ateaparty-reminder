export class DiscordMember {
  constructor(public readonly user_id: string, public readonly name: string) {}

  /**
   * Get mebntion string
   * @returns mention string
   * @example
   * const member = new DiscordMember('502486808211357707');
   * member.mention(); // <@!502486808211357707>
   */
  public mention(): string {
    return `<@!${this.user_id}>`;
  }
}
