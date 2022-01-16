export class DiscordMember {
  constructor(public readonly user_id: string) {}

  /**
   * Get mebntion string
   * @returns mention string
   * @example
   * const member = new DiscordMember('tkt#6539');
   * member.mention(); // <@!6539>
   */
  public mention(): string {
    return `<@!${this.user_id}>`;
  }
}
