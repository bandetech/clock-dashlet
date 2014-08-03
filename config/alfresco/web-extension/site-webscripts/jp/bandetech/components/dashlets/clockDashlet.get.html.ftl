<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script type="text/javascript" src="${url.context}/res/components/dashlets/clockDashlet.js" group="dashlets"/>
</@>

<@markup id="widgets">
   <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign id = args.htmlid?html>
      <#assign dashboardconfig=config.scoped['Dashboard']['dashboard']>
      <div class="dashlet clock">
	       <div class="title">${msg("header.title")}</div>
         <div id="${id}-clock" class="body" <#if args.height??>style="height: ${args.height}px;"</#if>>
		<canvas id="${id}-clockCanvas">${msg("clock.requirehtml5")}</canvas>
	</div>
      </div>
   </@>
</@>
