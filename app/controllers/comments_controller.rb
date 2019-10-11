class CommentsController < ApplicationController
  def show
    @account_id = Account.find(params[:id].to_i).id
    @comments = Comment.where("account_id = ?", @account_id)
    @use = @comments.as_json(:include => {:account => {:include => {:debter => {:include =>:debtcollector} } } } )
    render json: @use.reverse
  end

  def create_comment
    @comment = Comment.create(:string => params[:comment_string] , :account_id =>  params[:account_id])
    render json: @comment
  end

  def comment_params
    params.require(:comment).permit(:string, :account_id)
  end
end
